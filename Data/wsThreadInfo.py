import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime, timedelta

# Initialize the driver
driver = webdriver.Firefox()

url = 'https://sanctioned-suicide.net/threads/gave-my-therapist-my-notice.172963/'
driver.get(url)

# Wait for the popup to be present and click the button
try:
    popup_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, 'button.popup-button.primary'))
    )
    popup_button.click()
except Exception as e:
    print("No popup appeared or the popup button was not found.")

# Function to parse relative dates
def parse_date(date_str):
    if date_str.startswith("Today"):
        today = datetime.today().strftime('%b %d, %Y')
        return today + date_str[5:]
    elif date_str.startswith("Yesterday"):
        yesterday = (datetime.today() - timedelta(days=1)).strftime('%b %d, %Y')
        return yesterday + date_str[9:]
    else:
        return date_str

# Prepare a list to store message data
messages_data = []

# Wait for the messages to load and extract details
try:
    messages = WebDriverWait(driver, 10).until(
        EC.presence_of_all_elements_located((By.CLASS_NAME, 'message'))
    )

    for message in messages:
        message_id = message.get_attribute('id').split('-')[-1]
        author = message.find_element(By.CLASS_NAME, 'message-name').text
        date_element = message.find_element(By.CSS_SELECTOR, 'time.u-dt')
        date_str = date_element.get_attribute('title')
        date = parse_date(date_str)

        # Extract blockquotes and linked message IDs first
        blockquotes = message.find_elements(By.CSS_SELECTOR, 'blockquote[data-source]')
        linked_messages = [blockquote.get_attribute('data-source').split(':')[-1].strip() for blockquote in blockquotes]

        # Remove blockquotes from message body before getting the content
        for blockquote in blockquotes:
            driver.execute_script("arguments[0].remove();", blockquote)

        # Get the content after removing blockquotes
        content = message.find_element(By.CLASS_NAME, 'message-body').text

        # Append data to the list
        messages_data.append([message_id, author, date, content, '; '.join(linked_messages)])

except Exception as e:
    print(f"An error occurred: {e}")

# Create a DataFrame from the collected data
df = pd.DataFrame(messages_data, columns=['Message ID', 'Author', 'Date', 'Content', 'Linked Messages'])

# Save the DataFrame to a CSV file
df.to_csv('messages.csv', index=False, encoding='utf-8')

# Close the driver
driver.quit()