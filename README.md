# One Gear Grappling

A responsive static website for a mixed martial arts gym offering Stand-Up and Brazilian Jiu-Jitsu classes.

## Overview

Built for One Gear Grappling, a local MMA gym based at Parktown Boys' High School in Johannesburg. The site is designed for potential members to find information about programs, the instructor, the weekly schedule, and get in touch with the coach directly.

## Features

- Program info (Boxing/Kickboxing, BJJ, MMA, Young Guns) with pricing
- Instructor profile with MMA record link
- Weekly schedule overview
- WhatsApp-integrated contact form with client-side validation
- Downloadable indemnity form
- Hamburger navigation for mobile
- Fade-in scroll animations
- Fully responsive — mobile and desktop

## Tech Stack

- HTML5
- CSS3 (mobile-first, responsive)
- Vanilla JavaScript
- Netlify Forms / WhatsApp Business API (contact)

## Security Considerations

- Contact form data is passed to the WhatsApp API via `encodeURIComponent` rather than rendered back to the DOM, avoiding reflected XSS risk on the client side
- Client-side input validation: phone number format check, email format validation, and rate limiting on form submission
- No backend — static site architecture eliminates server-side attack surface entirely

## Deployment

Deployed via Netlify with GitHub integration — pushes to `main` trigger automatic redeploys.

## Status

In progress — awaiting final content from the gym (contact details, indemnity form).