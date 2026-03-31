import Header from '../Header/Header';
import Container from '../Container/Container';
import type { FC, PropsWithChildren } from 'react';
import classes from './MainLayout.module.css';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={classes.main}>
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default MainLayout;
