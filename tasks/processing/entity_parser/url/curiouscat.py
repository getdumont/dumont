from selenium import webdriver

class CuriousCatUrlParser():
    @staticmethod
    def match(url):
        return url['display_url'][0:10] == 'curiouscat'

    @staticmethod
    def parse(url, text):
        selector = '.post .post-content .text-content .reply .reply-content .reply-text span'
        driver = webdriver.PhantomJS()
        driver.set_window_size(1024, 768)
        driver.get(url['expanded_url'])
        response = driver.find_element_by_css_selector(selector).text

        return response