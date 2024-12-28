# Web Scraping

## Overview

This project is a web application that allows users to sign up, log in, upload datasets, and download them as CSV files. The frontend is built using React and Vite, while the backend is powered by Node.js, Express, MongoDB, and Puppeteer for web scraping.

Key Features
Dataset Creation: Users can create datasets by providing a URL, specifying the number of columns, and selecting the desired text elements from the webpage.
Profile Page: After creating a dataset, it will appear on the user's profile page.
CSV Export: Users can download their datasets in CSV format.


## Future Features
1) User Data Analytics: Add data visualization tools so users can analyze the data they’ve collected through charts and graphs.
2) AI for Image Recognition :Image Classification: If your scraping involves images (e.g., product listings with images), you could use AI models to classify and tag images based on their content
3) Sentiment Analysis
Sentiment Extraction: If the scraped data includes reviews, comments, or user feedback, use sentiment analysis to classify the sentiments (positive, neutral, negative) of the text.
4) Optical Character Recognition (OCR)
OCR for Image-to-Text: If you scrape images with text (e.g., screenshots, scanned documents), integrate OCR to convert images into readable text.

## Technologies Used

- **Frontend**: React, Vite, CSS
- **Backend**: Node.js, Express, MongoDB, Puppeteer
- **Other**: CORS, Cookie Parser, JSON2CSV

## Setup Instructions

Follow the steps below to set up the project on your local machine:

### 1. Clone the Repository

To clone the repository, run the following command in your terminal:

```bash
git clone https://github.com/Parsh15/Web-Scraping.git
cd Web-Scraping


## SetUp the Frontend
Navigate to the frontend folder and install the dependencies:

cd frontend
npm install

##  Set Up the Backend
Navigate to the server folder and install the dependencies:

cd ../server
npm install



### 2. Set Up Environment Variables

You need to create `.env` files for both the **frontend** and **backend**.

#### **Backend (.env)**

In the `server` folder, create a `.env` file with the following variables:

```plaintext
MONGO_URL=your_mongo_database_url  # Replace with your MongoDB URL
PORT=4444  # Port on which the backend server will run
CORS_ORIGIN=http://localhost:5173  # URL of your frontend (if running locally)


VITE_API_BASE_URL=http://localhost:4444  # URL of your backend (if running locally)
