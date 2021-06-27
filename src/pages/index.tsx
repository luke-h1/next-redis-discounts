// import { GetServerSideProps } from 'next';
// import cache from '@src/cache';

interface IProps {
  coupon: string | null;
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
        <h1>Sorry no coupon</h1>
      )}
    </div>
  );
};
export default Home;
// https://api.purchasing-power-parity.com/?target=
