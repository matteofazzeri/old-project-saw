'''from selenium import webdriver
from msedge.selenium_tools import Edge, EdgeOptions'''
import random
import string
from pprint import pprint
list = []



def generatePwd(n):
  password = []

  # Combine the character sets into a single set of all possible characters
  all_chars = string.ascii_uppercase + string.ascii_lowercase + string.digits + string.punctuation

  # Generate a random password of length ln by choosing characters from the combined set
  for i in range (n):
    password.append( ''.join(random.choice(all_chars) for _ in range(random.randrange(8, 16))))

  return password

def generateEmail(n):
  pass

def generateName(n):
  pass

def generateUsername(n):
  pass

# Inizializza il driver di Selenium per Microsoft Edge
'''options = EdgeOptions()
options.use_chromium = True
driver = Edge(options=options)'''

pwd = []

# Genero informazioni per la registrazione
email = generateEmail(10)
pwd = generatePwd(100)
name = generateName(10)
username = generateUsername(10)

pprint(pwd)
'''
# Visita la pagina di login
driver.get("http://localhost/es/GitHub-Clone/saw-projectc/testSQL/src/registration.php")

# Inserisci il nome utente e la password nei campi di input
username_input = driver.find_element_by_name("email")
password_input = driver.find_element_by_name("pass")
username_input.send_keys(email)
password_input.send_keys(pwd)

# Invia il form di login
login_button = driver.find_element_by_xpath("//button[@type='submit']")
login_button.click()

# Chiudi il driver di Selenium
driver.quit()
'''