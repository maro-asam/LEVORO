# LEVORO

**LEVORO** is a custom clothing platform built to help customers design, preview, and order personalized fashion pieces with confidence.

The idea is simple: instead of buying clothes from the shelf, customers can create pieces that match their own style — starting with custom hoodies, oversized t-shirts, and group orders.

LEVORO focuses on making the custom clothing experience easier, clearer, and more trustworthy by combining product customization, design review, order confirmation, and made-to-order production.

---

## Overview

Most custom clothing services stop at basic printing: upload an image, choose a product, and hope the final result looks good.

LEVORO is designed differently.

The platform gives customers a guided experience where they can:

- Choose a clothing item
- Upload a design or describe an idea
- Preview the design before production
- Get a designer review before printing
- Approve the final version
- Track the order through production and delivery

The goal is to reduce confusion, avoid low-quality print results, and make the customer feel confident before placing a custom order.

---

## Key Features

- **Arabic-first experience**
  - Built for the Egyptian market with RTL layout and Arabic copy.

- **Custom clothing flow**
  - Customers can start with a product, design idea, image, logo, or text.

- **Preview before production**
  - Customers can see how their design may look before printing.

- **Designer check**
  - Designs can be reviewed before production to avoid poor placement, weak image quality, or unclear output.

- **Made-to-order production**
  - Products are manufactured only after customer confirmation.

- **Guest checkout**
  - Customers do not need to create an account to place an order.

- **Order tracking**
  - Orders can be tracked using an order code and phone number verification.

- **Admin dashboard ready**
  - The database structure supports order management, design reviews, payment status, production status, and shipment tracking.

---

## Tech Stack

LEVORO is built using a modern full-stack TypeScript stack:

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Framer Motion**
- **Prisma**
- **PostgreSQL**
- **NeonDB**
- **Server Actions**

---

## Project Goals

LEVORO is not just a print-on-demand store.

The main goal is to create a premium custom clothing experience where customers can move from idea to finished product without confusion.

The platform is designed around four core principles:

1. **Clarity**
   - Customers should understand every step before ordering.

2. **Trust**
   - Customers should approve the design before production starts.

3. **Quality**
   - Designs should be reviewed before printing.

4. **Simplicity**
   - The ordering experience should be fast, clean, and easy to use.

---

## Main Sections

The landing page currently includes:

- Hero section
- Problem / Pain section
- How It Works section
- Products section
- Why LEVORO section
- Use Cases section
- Trust / Quality section
- FAQ section
- Final CTA section
- Footer

---

## Product Categories

The MVP focuses on a small number of customizable products:

- **Oversized T-Shirts**
- **Custom Hoodies**
- **Group Orders / Merch Drops**

This keeps the first version focused, easier to operate, and easier to validate with real customers.

---

## Database Design

The project is designed to support a full custom order lifecycle, including:

- Products
- Product variants
- Customers
- Designs
- Artwork uploads
- Orders
- Order items
- Payments
- Shipments
- Design reviews
- Order status logs

Customers can place orders as guests, while the admin system can manage production, design approvals, payments, and delivery status.

---

## Order Flow

A typical LEVORO order flow looks like this:

```txt
Customer chooses product
        ↓
Customer uploads design or writes an idea
        ↓
Design preview is created
        ↓
Designer reviews the design
        ↓
Customer approves the final version
        ↓
Production starts
        ↓
Quality check
        ↓
Shipping
        ↓
Delivered