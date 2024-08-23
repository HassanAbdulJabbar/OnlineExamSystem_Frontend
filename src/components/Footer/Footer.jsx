import React from "react";

import {
  Box,
  FooterContainer,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";

import "./Footer.css";

const Footer = () => {
  return (
    <Box>
      <h1 className="footer-header">Test your abilities with Dev Geeks</h1>
      <FooterContainer>
        <Row>
          <Column>
            <Heading className="footer-subheader">About Us</Heading>
            <FooterLink href="#">Aim</FooterLink>
            <FooterLink href="#">Vision</FooterLink>
            <FooterLink href="#">Testimonials</FooterLink>
          </Column>
          <Column>
            <Heading className="footer-subheader">Services</Heading>
            <FooterLink href="#">Writing</FooterLink>
            <FooterLink href="#">Internships</FooterLink>
            <FooterLink href="#">Coding</FooterLink>
            <FooterLink href="#">Teaching</FooterLink>
          </Column>
          <Column>
            <Heading className="footer-subheader">Contact Us</Heading>
            <FooterLink href="#">Head Office</FooterLink>
            <FooterLink href="#">Regional office</FooterLink>
            <FooterLink href="#">Central office</FooterLink>
            <FooterLink href="#">Centers</FooterLink>
          </Column>
          <Column>
            <Heading className="footer-subheader">Contact Us</Heading>
            <FooterLink href="#">Lahore</FooterLink>
            <FooterLink href="#">Islamabad</FooterLink>
            <FooterLink href="#">Karachi</FooterLink>
            <FooterLink href="#">Multan</FooterLink>
          </Column>
        </Row>
      </FooterContainer>
    </Box>
  );
};
export default Footer;
