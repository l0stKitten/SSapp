import pandas as pd
import re

def parse_bibtex_entry(bibtex_entry):
    """Parse a single BibTeX entry into a dictionary."""
    # Define a dictionary to store parsed fields
    entry_dict = {}
    
    # Extract fields with regex and handle possible None values
    try:
        entry_dict['Title'] = re.search(r'title\s*=\s*\{(.*?)\}', bibtex_entry).group(1)
    except AttributeError:
        entry_dict['Title'] = None
        
    try:
        entry_dict['Author'] = re.search(r'author\s*=\s*\{(.*?)\}', bibtex_entry).group(1)
    except AttributeError:
        entry_dict['Author'] = None
        
    try:
        entry_dict['Journal'] = re.search(r'journal\s*=\s*\{(.*?)\}', bibtex_entry).group(1)
    except AttributeError:
        entry_dict['Journal'] = None
        
    try:
        entry_dict['Volume'] = re.search(r'volume\s*=\s*\{(.*?)\}', bibtex_entry).group(1)
    except AttributeError:
        entry_dict['Volume'] = None
        
    try:
        entry_dict['Pages'] = re.search(r'pages\s*=\s*\{(.*?)\}', bibtex_entry).group(1)
    except AttributeError:
        entry_dict['Pages'] = None
        
    try:
        entry_dict['Year'] = re.search(r'year\s*=\s*\{(.*?)\}', bibtex_entry).group(1)
    except AttributeError:
        entry_dict['Year'] = None
        
    try:
        entry_dict['Keywords'] = re.search(r'keywords\s*=\s*\{(.*?)\}', bibtex_entry).group(1)
    except AttributeError:
        entry_dict['Keywords'] = None

    return entry_dict

def read_bib_file(file_path):
    """Read a BibTeX file and return a list of entries."""
    with open(file_path, 'r', encoding='utf-8', errors='replace') as file:
        content = file.read()
    
    # Split entries by the @ symbol and filter out empty entries
    entries = [entry.strip() for entry in content.split('@')[1:] if entry.strip()]
    # Prepend the '@' back to each entry
    return ['@' + entry for entry in entries]

def main(bib_file, csv_file):
    """Main function to convert BibTeX file to CSV."""
    bib_entries = read_bib_file(bib_file)
    parsed_entries = [parse_bibtex_entry(entry) for entry in bib_entries]

    # Create a DataFrame
    df = pd.DataFrame(parsed_entries)

    # Save to CSV
    df.to_csv(csv_file, index=False)
    print(f'Data successfully saved to {csv_file}')

# Specify the input BibTeX file and output CSV file
bib_file_path = 'acm.bib'  # Replace with your .bib file path
csv_file_path = 'acm.csv'       # Desired output CSV file name

# Run the main function
main(bib_file_path, csv_file_path)
