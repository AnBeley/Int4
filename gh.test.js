let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The first link attribute", async () => {
    jest.setTimeout(50000);
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    jest.setTimeout(50000);
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  });

  describe("The h1 header content testing task", () => {
    afterEach(async () => {
      const firstLink = await page.$("header div div a");
      await firstLink.click();
      await page.waitForSelector("h1");
    });

    test("The h1 header content zero'", async () => {
      jest.setTimeout(50000);
      await page.goto("https://github.com/team");
      const title0 = await page.title();
      expect(title0).toEqual(
        "GitHub for teams · Build like the best teams on the planet · GitHub"
      );
    });

    test("The h1 header content first'", async () => {
      jest.setTimeout(50000);
      await page.goto("https://github.com/collections");
      const title1 = await page.title();
      expect(title1).toEqual("Collections · GitHub");
    });

    test("The h1 header content second'", async () => {
      jest.setTimeout(50000);
      await page.goto("https://github.com/topics");
      const title2 = await page.title();
      expect(title2).toEqual("Topics on GitHub · GitHub");
    });

    test("The h1 header content third'", async () => {
      jest.setTimeout(50000);
      await page.goto("https://github.com/trending");
      const title3 = await page.title();
      expect(title3).toEqual("Trending repositories on GitHub today · GitHub");
    });
  });
});
