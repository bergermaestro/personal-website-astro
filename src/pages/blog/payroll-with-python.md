---
layout: "../../layouts/ProjectLayout.astro"
title: "Simplifying Payroll with Python"
summary: "How I simplified a business' payroll process by creating an application which generates employee data into PDF Paystubs."
image: "https://res.cloudinary.com/matthewberger/image/upload/v1647296712/chris_ried_ieic5_Tq8_Y_Mk_unsplash_34bf008a14.jpg"
pubDate: "Sept 16 2021"
type: "Development"
---

## Introduction

Recently, I worked on helping a small business simplify and make more efficient their process for running payroll and delivering paystubs to employees.

In the current system, there was a reliance on manual data transfer for generating paystubs, which was a time consuming process, and as with any manual process, left open room for error. These were all areas that I knew the software could improve,  so the guideline I determined to direct this project was to:
> Simplify the process of running payroll by integrating with existing systems in order to provide a more intuitive and time-efficient method of generating paystubs.

## Development

### Implementation

In order to implement this project, I used a number of python modules, including but not limited to:

*PySimpleGui* in order to create the user interface. Although it does not allow for much in the way of customizability and seems to be mainly geared towards simple form-style interfaces, it fulfilled the needs for this project without overcomplicating the process through the use of a more robust system.

*PyPDF* in order to take the data read from the excel file and output it to a PDF. This was my first time using this Python module, and although most things were straightforward to accomplish, there were a few oddities. For example, when laying out elements on the output PDF, it begins from the bottom left corner, whereas all other layout software I have ever used have begun from the top left, including software such as Photoshop or Figma or even when absolutely positioning elements in HTML.

*Openpyxl* for reading data from an Excel spreadsheet and getting it into python.

### Challenges

Although the majority of the development of this project was straightforward, there were still a few challenges which I encountered during the process of building this program.

#### Selecting Pay Period

First, was developing the best way to select the pay period the software should generate the paystubs for.

Although the spreadsheet had a row corresponding to each pay period, I wanted the pay period selector to be more user friendly that simply a large list of dates.

Thus, I wanted to separate the selector for the month, and which pay period within the month into different dropdowns. However, since the spreadsheet also needs to track information such as holiday or vacation pay, or simply to add a note for the accountant, it cannot be guaranteed that there would be the same number of rows allocated to each month.

Thus, I ultimately determined that the best way to select what pay period the paystubs should be generated for was within the Excel spreadsheet itself, by highlighting the rows for which the paystubs should be generated. This solution was a win-win because it not only eliminated ambiguity in the code, but is also straightforward for the end user.

#### Custom Save Location

During testing, I was simply saving the project to the current working directory in order to make sure that information was getting written correctly to the pdf. This worked well for development, but one of the features that was incredibly important for the final version was the ability to save the files to a custom folder.

I had assumed that this would be available via the *.save* function within the PyPDF module, but this was incorrect - the module only comes with the ability to save to the current working directory. This was problematic as I planned to package the file into a .exe in order to easily distribute and install it. Thus, I had to use Python's built in file management system to have the code save the file to the working directory and then take the most recently added file from the working directory and cut and paste it into the specified output directory.

## Conclusion

Altogether, I believe that I helped this company save time and by extension money by helping them implement this software into their workflow, and it also have me valuable learning opportunities along the way.

### Doing it Over Again

If I were to tackle this project again from the beginning, there a few things I would change in the implementation of this project

Namely, although at the beginning of the project I spent time researching Python modules that would help me accomplish the task, I never stopped to think whether a standalone Python program was the best way to tackle this problem at all. Now, after executing on this option, I can see with hindsight that it probably would have been more efficient and even user friendlier to create an Add-In within Excel itself, which means that there would only be one program to deal with, further streamlining the process of generating payroll.

---

Thanks for reading! If you have any thoughts about this article, feel free to tweet me about them @itsmattberger on Twitter. Otherwise, until next time!


