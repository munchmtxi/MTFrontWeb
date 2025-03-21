/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { getResponsiveTheme } from '@/styles/themeResponsive';
import { greenScale } from '@/styles/themeTokens';

// Responsive theme
const theme = getResponsiveTheme('laptop');

// Contact Section Styles
const contactSectionStyles = css`
  padding: ${theme.spacing[20]} ${theme.spacing[4]};
  text-align: center;
  background-color: ${theme.components.card.baseStyle.backgroundColor};
`;

const contactTitle = css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['5xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  color: #fff;
  margin-bottom: ${theme.spacing[12]};
  line-height: ${theme.typography.lineHeights.tight};
`;

const contactContent = css`
  max-width: ${theme.grid.container.md};
  margin: 0 auto;
  font-family: ${theme.typography.fonts.body};
  font-size: ${theme.typography.fontSizes.lg};
  color: ${theme.components.input.baseStyle._placeholder.color};
  line-height: ${theme.typography.lineHeights.relaxed};
`;

const contactLink = css`
  color: ${greenScale[400]};
  text-decoration: none;
  transition: color 0.15s ${theme.transitions.timing.easeOut};
  &:hover {
    color: ${greenScale[600]};
    text-decoration: underline;
  }
`;

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main>
        <section css={contactSectionStyles}>
          <motion.h1
            css={contactTitle}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: theme.transitions.timing.easeOut }}
          >
            Contact Us
          </motion.h1>
          <motion.div
            css={contactContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: theme.transitions.timing.easeOut }}
          >
            <p>
              Have questions or need support? We’re here to help! Reach out to us via email at{' '}
              <a href="mailto:support@munchmtxi.com" css={contactLink}>
                support@munchmtxi.com
              </a>{' '}
              or call us at{' '}
              <a href="tel:+1234567890" css={contactLink}>
                +1 (234) 567-890
              </a>.
            </p>
            <p>
              For business inquiries, contact our team at{' '}
              <a href="mailto:business@munchmtxi.com" css={contactLink}>
                business@munchmtxi.com
              </a>.
            </p>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;