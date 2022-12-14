# Audiophile E-commerce Website

This is a solution to the [Audiophile e-commerce website challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/audiophile-ecommerce-website-C8cuSd_wx). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add/Remove products from the cart
- Edit product quantities in the cart
- Fill in all fields in the checkout
- Receive form validations if fields are missed or incorrect during checkout
- See correct checkout totals depending on the products in the cart
  - Shipping always adds $50 to the order
  - VAT is calculated as 20% of the product total, excluding shipping
- See an order confirmation modal after checking out with an order summary

### Screenshot

Desktop Layout:    
![](./screenshots/screenshot-d.jpg)

Mobile Layout:    
![](./screenshots/screenshot-m.jpg)

### Links

- Live Site URL: [https://p-audiophile.vercel.app/](https://p-audiophile.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Sanity](https://www.sanity.io/) - Headless CMS

### What I learned

- First time using Next.JS for a project. Learned about its server side rendering capabilities, getServerSideProps system,
  built-in file routing and using Context as an alternative to Redux for global state management. Overall positive experience with the
  framework and very happy with all the features available. Only issues encountered was poor results for client-side javascript media 
  queries due to Next.JS being primarily SSR. 
- First time using Tailwind CSS. Frustrating to use at first, but soon became easy to use and preferable to regular CSS. 
- First time using Sanity and headless CMS. Greatly simplified the backend work compared to an Express/MongoDB solution.

## Author

- [My Portfolio](https://antcodev.ca)
