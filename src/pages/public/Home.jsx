/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

// Container with a black background for a cinematic look
const containerStyle = css`
  background-color: #000;
  color: #e0e0e0;
  font-family: 'Montserrat', sans-serif;
  min-height: 100vh;
`;

// Hero section with a cinematic background image and dark overlay
const heroSectionStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  background: url('/images/cinematic-bg.jpg') no-repeat center center/cover;
  background-color: #000;
  text-align: center;
  padding: 20px;
`;

const overlayStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
`;

const heroContentStyle = css`
  position: relative;
  z-index: 2;
`;

const titleStyle = css`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: 2px;
  color: #1dbf1d;
`;

const subtitleStyle = css`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #fedc01;
`;

const ctaButtonStyle = css`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #1dbf1d;
  color: #000;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    background-color: #fedc01;
    transform: translateY(-2px);
  }
`;

// Services Section Styles
const servicesSectionStyle = css`
  padding: 80px 20px;
  background-color: #111;
`;

const serviceGridStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const serviceItemStyle = css`
  background-color: #222;
  padding: 30px;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);
  }
`;

const serviceTitleStyle = css`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1dbf1d;
`;

const serviceDescStyle = css`
  font-size: 1rem;
  color: #bbb;
`;

// HomePage Component
const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div css={containerStyle}>
      <Header />
      <main>
        {/* Hero Section */}
        <section css={heroSectionStyle}>
          <div css={overlayStyle} />
          <div css={heroContentStyle}>
            <motion.h1
              css={titleStyle}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              WELCOME
            </motion.h1>
            <motion.p
              css={subtitleStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Experience the Future 
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <Link to="/register" css={ctaButtonStyle}>
                Get Started
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section css={servicesSectionStyle}>
          <motion.h2
            css={css`
              text-align: center;
              font-size: 2rem;
              font-weight: 700;
              color: #1dbf1d;
              margin-bottom: 2rem;
            `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Our Services
          </motion.h2>
          <div css={serviceGridStyle}>
            <motion.div
              css={serviceItemStyle}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <h3 css={serviceTitleStyle}>Innovative Cuisine</h3>
              <p css={serviceDescStyle}>
                Explore culinary delights with cutting-edge technology.
              </p>
            </motion.div>
            <motion.div
              css={serviceItemStyle}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <h3 css={serviceTitleStyle}>Instant Ordering</h3>
              <p css={serviceDescStyle}>
                Experience lightning-fast order processing.
              </p>
            </motion.div>
            <motion.div
              css={serviceItemStyle}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <h3 css={serviceTitleStyle}>Rapid Delivery</h3>
              <p css={serviceDescStyle}>
                Delivering your cravings with unparalleled speed.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
