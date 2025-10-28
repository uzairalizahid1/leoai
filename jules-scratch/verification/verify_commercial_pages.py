from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:3000/pricing")
    page.screenshot(path="/app/jules-scratch/verification/pricing.png")
    page.goto("http://localhost:3000/billing")
    page.screenshot(path="/app/jules-scratch/verification/billing.png")
    page.goto("http://localhost:3000/admin")
    page.screenshot(path="/app/jules-scratch/verification/admin.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
