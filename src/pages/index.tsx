import { GetServerSideProps } from 'next';
import cache from '@src/cache';

interface IProps {
  coupon: string | null;
}

interface IPPPData {
  ppp: {
    pppConversionFactor: number;
  };
}

const Home = ({ coupon }: IProps) => {
  return (
    <div>
      {coupon ? (
        <h1>
          Your coupon is
          {coupon}
        </h1>
      ) : (
        <h1>Sorry...no coupon</h1>
      )}
    </div>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const country = 'CO';

  const fetcher = async () => {
    const url = `https://api.purchasing-power-parity.com/?target=${country}`;
    const resp = await fetch(url);
    const data: IPPPData = await resp.json();
    console.log(new Date());
    let coupon: string | null = null;
    if (data.ppp.pppConversionFactor < 0.25) {
      coupon = 'PPP75';
    } else if (data.ppp.pppConversionFactor < 0.5) {
      coupon = 'PPP50';
    } else if (data.ppp.pppConversionFactor < 0.75) {
      coupon = 'PPP25';
    }
    return coupon;
  };
  // cache.del(`ppp:${country}`)

  const cachedCoupon = await cache.fetch<Promise<string | null>>(
    `ppp:${country}`,
    fetcher,
    60 * 60,
  ); // cache for 1hr

  return {
    props: { coupon: cachedCoupon },
  };
};
// https://api.purchasing-power-parity.com/?target=
