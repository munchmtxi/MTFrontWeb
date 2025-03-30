/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, useTheme } from '@emotion/react';
import { motion } from 'framer-motion';
import { FaTwitter, FaFacebook, FaInstagram, FaApple, FaAndroid } from 'react-icons/fa';

// New Footer Styles for our modern, minimal look
const footerStyles = (theme) => css`
  background-color: #111; /* Dark background for sophistication */
  padding: ${theme.spacing[7]} ${theme.spacing[3]} ${theme.spacing[4]};
  color: #e0e0e0;
`;

const containerStyles = (theme) => css`
  max-width: 1200px;
  margin: 0 auto;
`;

const topSectionStyles = (theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[5]};
  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
  }
`;

const brandSectionStyles = css`
  flex: 1;
`;

const logoStyles = (theme) => css`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing[2]};
`;

const munchStyles = (theme) => css`color: #1dbf1d;`;  // Primary signature green
const mStyles = (theme) => css`color: #fedc01;`;          // Secondary signature yellow
const txiStyles = (theme) => css`color: #ffffff;`;

const socialContainerStyles = (theme) => css`
  display: flex;
  gap: ${theme.spacing[2]};
  margin-top: ${theme.spacing[3]};
`;

const socialIconStyles = (theme) => css`
  font-size: 1.5rem;
  color: #1dbf1d;
  transition: transform 0.2s ease, color 0.2s ease;
  &:hover {
    color: #fedc01;
    transform: scale(1.2);
  }
`;

const linksContainerStyles = (theme) => css`
  flex: 3;
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[5]};
`;

const columnStyles = css`
  flex: 1;
  min-width: 160px;
`;

const columnTitleStyles = (theme) => css`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: ${theme.spacing[2]};
  text-transform: uppercase;
`;

const linkListStyles = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const listItemStyles = (theme) => css`
  margin-bottom: ${theme.spacing[1]};
`;

const linkStyles = (theme) => css`
  color: #bbb;
  text-decoration: none;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  transition: color 0.2s ease;
  &:hover {
    color: #fedc01;
    text-decoration: underline;
  }
`;

const logoListStyles = (theme) => css`
  display: flex;
  gap: ${theme.spacing[2]};
  align-items: center;
`;

const logoIconStyles = (theme) => css`
  font-size: 2rem;
  color: #1dbf1d;
`;

const pciTextStyles = (theme) => css`
  font-size: 0.875rem;
  color: #bbb;
`;

const separatorStyles = (theme) => css`
  height: 1px;
  background-color: #333;
  margin: ${theme.spacing[4]} 0;
`;

const bottomSectionStyles = (theme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${theme.spacing[2]};
`;

const copyrightStyles = (theme) => css`
  color: #777;
  font-size: 0.875rem;
  font-family: 'Montserrat', sans-serif;
`;

// Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.5, staggerChildren: 0.1, delayChildren: 0.1 } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } 
  },
};

const hoverTapTransition = { duration: 0.2 };

// Footer Component with revamped styling
const Footer = () => {
  const theme = useTheme();
  const socialLinks = [
    { href: 'https://twitter.com', icon: <FaTwitter /> },
    { href: 'https://facebook.com', icon: <FaFacebook /> },
    { href: 'https://instagram.com', icon: <FaInstagram /> },
  ];

  const footerColumns = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Policies',
      links: [
        { label: 'Terms', href: '/terms' },
        { label: 'Privacy', href: '/privacy' },
      ],
    },
  ];

  return (
    <footer css={footerStyles(theme)}>
      <motion.div
        css={containerStyles(theme)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div css={topSectionStyles(theme)}>
          <motion.div css={brandSectionStyles} variants={itemVariants}>
            <h4 css={logoStyles(theme)}>
              <span css={munchStyles(theme)}>MUNCH</span>
              <span css={mStyles(theme)}>M</span>
              <span css={txiStyles(theme)}>TXI</span>
            </h4>
            <p>Your favorite food delivery and restaurant booking platform</p>
            <div css={socialContainerStyles(theme)}>
              {socialLinks.map(({ href, icon }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  css={socialIconStyles(theme)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={hoverTapTransition}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <div css={linksContainerStyles(theme)}>
            {footerColumns.map((col, idx) => (
              <motion.div key={idx} css={columnStyles} variants={itemVariants}>
                <h5 css={columnTitleStyles(theme)}>{col.title}</h5>
                <ul css={linkListStyles}>
                  {col.links.map((link, index) => (
                    <li key={index} css={listItemStyles(theme)}>
                      <a href={link.href} css={linkStyles(theme)}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            <motion.div css={columnStyles} variants={itemVariants}>
              <h5 css={columnTitleStyles(theme)}>Platforms</h5>
              <div css={logoListStyles(theme)}>
                <FaApple css={logoIconStyles(theme)} />
                <FaAndroid css={logoIconStyles(theme)} />
              </div>
            </motion.div>

            <motion.div css={columnStyles} variants={itemVariants}>
              <h5 css={columnTitleStyles(theme)}>Compliance</h5>
              <div css={logoListStyles(theme)}>
                <span css={pciTextStyles(theme)}>PCI Compliant</span>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div variants={itemVariants}>
          <div css={separatorStyles(theme)}></div>
          <div css={bottomSectionStyles(theme)}>
            <p css={copyrightStyles(theme)}>
              © 2025 MunchMtxi, Inc. All rights reserved.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
