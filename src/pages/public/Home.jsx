/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css, keyframes } from '@emotion/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Truck } from 'lucide-react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { getResponsiveTheme } from '@/styles/themeResponsive';
import { greenScale } from '@/styles/themeTokens';

// Get the responsive theme (using 'laptop' as default)
const theme = getResponsiveTheme('laptop');

// Hero Section Animation
const heroAnimation = keyframes`
  ${theme.animation.keyframes.slideInTop.from} 
  ${theme.animation.keyframes.slideInTop.to}
`;

// Hero Section Styles
const heroSectionStyles = css`
  background: url('/images/hero-bg.jpg') center center/cover no-repeat;
  padding: ${theme.spacing[16]} ${theme.spacing[4]};
  text-align: center;
  color: #fff;
  animation: ${heroAnimation} 0.2s ${theme.animation.timingFunctions.easeOut};
  border-bottom-left-radius: ${theme.radii['3xl']};
  border-bottom-right-radius: ${theme.radii['3xl']};
  box-shadow: ${theme.shadows.lg};
`;

const heroTitle = css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['6xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  margin-bottom: ${theme.spacing[6]};
  line-height: ${theme.typography.lineHeights.tight};
  color: #000000; // Changed to black
`;

const heroSubtitle = css`
  font-family: ${theme.typography.fonts.body};
  font-size: ${theme.typography.fontSizes['3xl']};
  font-weight: ${theme.typography.fontWeights.normal};
  margin-bottom: ${theme.spacing[8]};
  line-height: ${theme.typography.lineHeights.relaxed};
  opacity: 0.9;
`;

const ctaButton = css`
  display: inline-block;
  padding: ${theme.components.button.sizes.md.padding};
  background-color: ${greenScale[600]};
  color: #fff;
  font-family: ${theme.typography.fonts.body};
  font-size: ${theme.components.button.sizes.md.fontSize};
  font-weight: ${theme.components.button.baseStyle.fontWeight};
  border-radius: ${theme.components.button.baseStyle.borderRadius};
  border: none;
  text-decoration: none;
  transition: ${theme.components.button.baseStyle.transition};
  cursor: pointer;
  &:hover {
    background-color: ${greenScale[700]};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.sm};
  }
  &:active {
    background-color: ${greenScale[800]};
    transform: translateY(0);
  }
`;

// Services Section Styles
const servicesSectionStyles = css`
  padding: ${theme.spacing[20]} ${theme.spacing[4]};
  text-align: center;
  background-color: ${theme.components.card.baseStyle.backgroundColor};
`;

const servicesTitle = css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['5xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  color: #fff;
  margin-bottom: ${theme.spacing[12]};
  line-height: ${theme.typography.lineHeights.tight};
`;

const servicesGrid = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing[6]};
  max-width: ${theme.grid.container.lg};
  margin: 0 auto;
`;

const serviceItem = css`
  background-color: ${theme.components.card.variants.filled.backgroundColor};
  padding: ${theme.spacing[6]};
  border-radius: ${theme.components.card.baseStyle.borderRadius};
  transition: transform 0.15s ${theme.transitions.timing.easeInOut};
  &:hover {
    transform: translateY(-${theme.spacing[2]});
    box-shadow: ${theme.shadows.lg};
  }
`;

const serviceIcon = css`
  font-size: ${theme.typography.fontSizes['4xl']};
  margin-bottom: ${theme.spacing[4]};
  color: ${greenScale[400]};
`;

const serviceTitle = css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['2xl']};
  font-weight: ${theme.typography.fontWeights.semibold};
  margin-bottom: ${theme.spacing[2]};
  color: #fff;
`;

const serviceDescription = css`
  font-family: ${theme.typography.fonts.body};
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.components.input.baseStyle._placeholder.color};
  line-height: ${theme.typography.lineHeights.relaxed};
`;

const Home = () => {
  const [services] = useState([
    {
      icon: <Package css={serviceIcon} />,
      title: 'Empower Your Business',
      description: 'Showcase your products and manage orders effortlessly.',
    },
    {
      icon: <ShoppingCart css={serviceIcon} />,
      title: 'Seamless Shopping',
      description: 'Experience fast checkout and real-time order tracking.',
    },
    {
      icon: <Truck css={serviceIcon} />,
      title: 'Swift Deliveries',
      description: 'Optimized routes ensure timely deliveries every time.',
    },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section css={heroSectionStyles}>
          <h1 css={heroTitle}>Welcome to Munch Mtxi</h1>
          <p css={heroSubtitle}>
            Experience the future of food delivery and restaurant booking
          </p>
          <Link to="/register" css={ctaButton}>
            Get Started
          </Link>
        </section>
        
        {/* Services Section */}
        <section css={servicesSectionStyles}>
          <h2 css={servicesTitle}>Our Core Services</h2>
          <div css={servicesGrid}>
            {services.map((service, index) => (
              <motion.div
                key={index}
                css={serviceItem}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.2, 
                  duration: 0.2,
                  ease: theme.transitions.timing.easeInOut 
                }}
              >
                {service.icon}
                <h3 css={serviceTitle}>{service.title}</h3>
                <p css={serviceDescription}>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;