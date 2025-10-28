from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:3000/login")
    page.screenshot(path="/app/jules-scratch/verification/login.png")
    page.goto("http://localhost:3000/signup")
    page.screenshot(path="/app/jules-scratch/verification/signup.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
