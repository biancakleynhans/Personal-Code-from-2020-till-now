const { readFile } = require('fs/promises');

module.exports = {
  // webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = { fs: false };

  //   return config;
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compress: true,
  images: {
    domains: ['mweb.co.za', 'www.mweb.co.za', 'apigw.mwebaws.co.za', 'api.mwebaws.co.za'],
  },

  async redirects() {
    let redirects = [];

    // redirect for coverage

    redirects.push({
      source: '/coverage',
      destination: '/',
      permanent: true,
    });

    const useStaticSEOUrl = process.env.NEXT_PUBLIC_ENABLE_NEW_SEO_URL === ('true' || true);

    if (useStaticSEOUrl) {
      //Add old product url format to new SEO urls

      const URL = `${process.env.NEXT_PUBLIC_PRODUCT_URLS}`;
      console.log('-------ADDING OLD PRODUCT REDIRECTS--------');
      console.info('Getting products from :  ', URL);
      const fetchResult = fetch(URL);
      const response = await fetchResult;
      const products = await response.json();

      let filteredProducts = products.filter(
        (product) => (product.productCategory.toLowerCase() === 'ftth' || product.productCategory.toLowerCase() === 'lte') && product.isAbTestUrl === false
      );

      filteredProducts.forEach((product) => {
        let url = product.productUrl;
        let oldUrl = product.oldProductUrl;

        redirectEntry = {
          source: oldUrl,
          destination: url,
          permanent: true,
        };

        redirects.push(redirectEntry);
      });
    }

    //Adding old help site article redirects
    const data = await readHelpRedirectCsv();
    const helpBaseUrl = process.env.NEXT_PUBLIC_HELPSITE_BASE_URL;

    var dataArray = data.split(/\r?\n/).forEach((line) => {
      values = line.split(',');
      var redirectEntry = {
        source: values[0].replace('https://www.mweb.co.za', ''),
        destination: values[1].replace('https://help.mweb.co.za', helpBaseUrl),
        permanent: true,
      };
      redirects.push(redirectEntry);
    });

    redirects.push({
      source: '/help-centre/:path*',
      destination: helpBaseUrl,
      permanent: true,
    });

    redirects.push({
      source: '/help/:path*',
      destination: helpBaseUrl,
      permanent: true,
    });

    redirects.push({
      source: '/help',
      destination: helpBaseUrl,
      permanent: true,
    });

    //--Adding old help site article redirects

    //console.log("Redirects:", redirects);

    return redirects;
  },

  async rewrites() {
    //  console.log("-------ADDING URL REWRITES--------");
    return [
      {
        source: '/media/:path*',
        destination: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/:path*`, // Proxy to Backend
      },
      {
        source: '/dev/:path*',
        destination: `https://apigw.mwebaws.co.za/dev/:path*`,
      },
    ];
  },
};

const readHelpRedirectCsv = async () => {
  return await readFile('help_redirects.csv', 'utf8');
};
