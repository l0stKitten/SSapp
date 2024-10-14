from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime, timedelta
import pandas as pd

# Initialize the driver
driver = webdriver.Firefox()

url = 'https://sanctioned-suicide.net/forums/suicide-discussion.2/page-2513'
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

def extract_thread_data():
    # Wait for the page to load completely
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, '.structItemContainer-group.js-threadList'))
    )

    # Find the correct thread list container
    thread_list = driver.find_element(By.CSS_SELECTOR, '.structItemContainer-group.js-threadList')

    # Get all thread items
    threads = thread_list.find_elements(By.CLASS_NAME, 'structItem--thread')

    # Iterate through the threads and extract the required information
    thread_data = []
    for thread in threads:
        try:
            # Find the title element
            title_element = thread.find_element(By.CLASS_NAME, 'structItem-title')
            
            # Extract the href attribute for the correct link (last <a> tag in the title element)
            link_elements = title_element.find_elements(By.TAG_NAME, 'a')
            link = link_elements[-1].get_attribute('href') if link_elements else None

            # Extract text and remove the label text
            title_text = link_elements[-1].text if link_elements else "Unknown Title"  # Fallback if no title is found

            # Remove any labels from the title if they exist
            label_elements = title_element.find_elements(By.XPATH, './/span[contains(@class, "label")]')
            for label in label_elements:
                title_text = title_text.replace(label.text, '').strip()

            # Extract the number of views and replies (using try-except to handle missing elements)
            try:
                views = thread.find_element(By.XPATH, './/dl[dt[text()="Views"]]/dd').text
            except Exception:
                views = "0"  # Fallback in case views are missing

            try:
                replies = thread.find_element(By.XPATH, './/dl[dt[text()="Replies"]]/dd').text
            except Exception:
                replies = "0"  # Fallback in case replies are missing

            # Find the date of the thread (ensure it's parsed correctly)
            try:
                date = parse_date(thread.find_element(By.CLASS_NAME, 'structItem-startDate').text)
            except Exception:
                date = "Unknown Date"  # Fallback in case date is missing

            # Collect the label texts (if any)
            label_texts = [label.text for label in label_elements]

            # Set default label if none are found
            if not label_texts:
                label_texts = ["none"]

            # Append the data
            thread_data.append({
                'title': title_text,
                'link': link,
                'views': views,
                'replies': replies,
                'date': date,
                'labels': label_texts
            })

        except Exception as e:
            print(f"Error extracting data for a thread: {e}")
            # Continue with the next thread even if an error occurs with this one
            continue

    return thread_data


# Initialize thread_data list and counter
thread_data = []
counter = 0

while counter < 5000:
    # Extract data from the current page
    page_data = extract_thread_data()
    thread_data.extend(page_data)
    counter = len(thread_data)

    # Check if we need to go to the next page
    try:
        next_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'a.pageNav-jump.pageNav-jump--prev'))
        )
        next_button.click()
    except Exception as e:
        print("No more pages to navigate or the next button was not found.")
        break

# Close the driver
driver.quit()

# Trim the thread data to the first 600 entries if there are more
thread_data = thread_data[:5000]

# Create a pandas DataFrame from the collected data
df = pd.DataFrame(thread_data)

# Save the DataFrame to a CSV file
df.to_csv('thread_data10.csv', index=False, header=['Title', 'Link', 'Views', 'Replies', 'Date', 'Labels'])
