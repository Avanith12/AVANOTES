# Fix: PDF Pagination

## Issue
- The PDF export was shrinking (or cropping) long content onto a single A4 page.
- Scrolling was fixed, but the PDF engine (jspdf) doesn't automatically split images.

## Solution
- Implemented a "slicing" logic in `pdfExporter.ts`.
- The script calculates the total height of the generated content image.
- It adds the image to the first page.
- If the content is taller than one A4 page, it adds a new page, effectively shifting the image "up" (negative Y position) to reveal the next segment.
- This creates the effect of a continuous document across multiple PDF pages.
