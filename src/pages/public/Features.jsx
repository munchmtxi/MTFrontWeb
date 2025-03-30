/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { getResponsiveTheme } from '@/styles/themeResponsive';
import { greenScale } from '@/styles/themeTokens';
import { Package, ShoppingCart, Truck, Clock } from 'lucide-react';

const theme = getResponsiveTheme('laptop');

const featuresSectionStyles = css`
  padding: ${theme.spacing[20]} ${theme.spacing[4]};
  text-align: center;
  background-color: #000;
`;

const featuresTitle = css`
  font-family: 'Montserrat', sans-serif;
  font-size: ${theme.typography.fontSizes['5xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  color: #1dbf1d;
  margin-bottom: ${theme.spacing[12]};
  line-height: ${theme.typography.lineHeights.tight};
`;

const featuresGrid = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing[6]};
  max-width: ${theme.grid.container.lg};
  margin: 0 auto;
`;

const featureItem = css`
  background-color: #111;
  padding: ${theme.spacing[6]};
  border-radius: ${theme.components.card.baseStyle.borderRadius};
  transition: transform 0.15s ${theme.transitions.timing.easeInOut};
  &:hover {
    transform: translateY(-${theme.spacing[2]});
    box-shadow: ${theme.shadows.lg};
  }
`;

const featureIcon = css`
  font-size: ${theme.typography.fontSizes['4xl']};
  margin-bottom: ${theme.spacing[4]};
  color: ${greenScale[400]};
`;

const featureTitle = css`
  font-family: 'Montserrat', sans-serif;
  font-size: ${theme.typography.fontSizes['2xl']};
  font-weight: ${theme.typography.fontWeights.semibold};
  margin-bottom: ${theme.spacing[2]};
  color: #e0e0e0;
`;

const featureDescription = css`
  font-family: 'Montserrat', sans-serif;
  font-size: ${theme.typography.fontSizes.md};
  color: #bbb;
  line-height: ${theme.typography.lineHeights.relaxed};
`;

const Features = () => {
  const [features] = useState([
    {
      icon: <Package css={featureIcon} />,
      title: 'Merchant Tools',
      description: 'Manage your inventory, orders, and customer insights with ease.',
    },
    {
      icon: <ShoppingCart css={featureIcon} />,
      title: 'Customer Experience',
      description: 'Fast checkout and personalized recommendations for shoppers.',
    },
    {
      icon: <Truck css={featureIcon} />,
      title: 'Delivery Optimization',
      description: 'Real-time tracking and efficient delivery routes.',
    },
    {
      icon: <Clock css={featureIcon} />,
      title: 'Booking System',
      description: 'Reserve tables and manage bookings seamlessly.',
    },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main>
        <section css={featuresSectionStyles}>
          <motion.h1
            css={featuresTitle}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: theme.transitions.timing.easeOut }}
          >
            Our Features
          </motion.h1>
          <div css={featuresGrid}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                css={featureItem}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.2,
                  ease: theme.transitions.timing.easeInOut,
                }}
              >
                {feature.icon}
                <h3 css={featureTitle}>{feature.title}</h3>
                <p css={featureDescription}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Features;
