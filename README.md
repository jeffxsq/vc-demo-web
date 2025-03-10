# Verifiable Credential Demo Web

A simple web application built with Node.js, Express and mock data to simulate the issuance, selective disclosure, and verification of verifiable credentials (VCs).

## Overview

This demo showcases:
- **Issuance:** Creating a VC with fields like KYC status, date of birth, nationality, and languages using `@terminal3/ecdsa_vc` and `@terminal3/vc_core`.
- **Selective Disclosure:** Generating a Verifiable Presentation (VP) with options to:
  - Display all fields.
  - Display selected fields (e.g., only KYC status).
  - Prove a predicate (e.g., holder is over 18) without revealing the full date of birth.
- **Verification:** Validating VCs and VPs using `@terminal3/verify_vc` and `@terminal3/verify_vp`.

## Prerequisites

- Node.js (v16 or higher)
- Git
- npm or yarn

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/jeffxsq/vc-demo-web.git
   cd vc-demo-web
2. **Install dependencies:**
   ```bash
   npm install
3. **Running the Web App:**
   1. Start the server
   ```bash
   npm start   
4. Open http://localhost:3000 in your browser. 
5. Click "Issue Credential" to generate a VC, then select disclosure options to create and verify a VP.