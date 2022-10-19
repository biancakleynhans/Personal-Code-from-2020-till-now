/* eslint-disable @next/next/no-document-import-in-page */
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='icon' href='/favicon.ico?v=2' />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
                                 `,
            }}
          />
        </Head>
        <body id='body' className='body'>
          {/* Google Api  */}
          {/* <Script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}></Script> */}
          <Main />
          <NextScript />

          <script async src={`https://www.googletagmanager.com/gtag/js?id=UA-51279388-1`} />

          <script
            dangerouslySetInnerHTML={{
              __html: `//GA Tags
                                (function(i, s, o, g, r, a, m) {
                                    i['GoogleAnalyticsObject'] = r;
                                    i[r] = i[r] ||
                                        function() {
                                            (i[r].q = i[r].q || []).push(arguments)
                                        }, i[r].l = 1 * new Date();
                                    a = s.createElement(o),
                                        m = s.getElementsByTagName(o)[0];
                                    a.async = 1;
                                    a.src = g;
                                    m.parentNode.insertBefore(a, m)
                                })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');`,
            }}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: ` window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'UA-51279388-1', { 'optimize_id': 'GTM-W5WQJV9'});
                                 `,
            }}
          />

          {/*-- Initial variables needed for Tawk.to -- */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();`,
            }}
          />
          {/* -- Initial variables needed for Tawk.to -- */}

          {/* Flowxo chat */}
          {/* hide from "vuma-reach-fibre" and "adsl-fibre" */}
          {this.props.__NEXT_DATA__.page !== '/vuma-reach-fibre' && this.props.__NEXT_DATA__.page !== '/adsl-fibre' && (
            <script
              async
              defer
              data-fxo-widget='eyJ0aGVtZSI6IiNjZTE5MjYiLCJ3ZWIiOnsiYm90SWQiOiI2MDVjNmUwM2QxOWNlYTAwODgyMzE1NWUiLCJ0aGVtZSI6IiNjZTE5MjYiLCJsYWJlbCI6Ik13ZWIgSGVscCBNZSBEZWNpZGUifSwid2VsY29tZVRleHQiOiJNd2ViIEhlbHAgTWUgRGVjaWRlIn0='
              src='https://widget.flowxo.com/embed.js'
            ></script>
          )}
        </body>
      </Html>
    );
  }
}
