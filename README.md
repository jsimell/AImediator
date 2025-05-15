# AI Mediator

This repository contains my contributions to the implementation of a text-based AI assistant for conversation mediation. The project was developed as part of the _Research Project in Human-Computer Interaction_ course at Aalto University.

The implementation builds on the Aalto University [Collaborative AI Arena](https://github.com/AaltoRSE/CollaborativeAI) template, which provided the core structure and baseline functionality for the system. This tool can be run locally by inserting the files from the [/task_template](https://github.com/jsimell/AImediator/tree/main/task_template) folder to the corresponding locations at the Collaborative AI Arena codebase, and following the instructions there.

In the project, I developed the following components:

- **React Frontend:** 
I developed a custom React-based user interface for the mediation task, using and extending the example templates provided in the [Collaborative AI Arena](https://github.com/AaltoRSE/CollaborativeAI) codebase. The source code of the mediator's frontend can be found at [/task_template/frontend_mediation/src](https://github.com/jsimell/AImediator/tree/main/task_template/frontend_mediation/src).

- **Prompt Engineering:**  
I iteratively designed and refined the system prompt to guide the AI assistant's behavior during mediation. The prompt is located in the mediation.py file: [task_template/app/task_examples/mediation.py](https://github.com/jsimell/AImediator/blob/main/task_template/app/task_examples/mediation.py).

## UI Images

### Opening View
![AImediator_demoImages1](https://github.com/user-attachments/assets/1d2cea9a-df65-41ef-82ea-ae35a7555aa9)

### Discussion Details Form (filled)
**Image 1/2**
![AImediator_demoImages2](https://github.com/user-attachments/assets/f9ec5f79-f623-4324-968c-7cd160e7363a)

**Image 2/2**
![AImediator_demoImages3](https://github.com/user-attachments/assets/a411daca-4a4c-4a60-9ab7-2f500ced6636)

### Chat Space for Mediation
**Image 1/3**: After pressing the form submit button, the system informs the user that a response is loading.
![AImediator_demoImages4](https://github.com/user-attachments/assets/27c30c29-5b5d-4c99-97af-528fe55f4d34)

**Image 2/3**: The first message is a discussion kickstarting message.
![AImediator_demoImages5](https://github.com/user-attachments/assets/f99b4dcf-a2ae-45eb-80fd-4b3dc86a4a2f)

**Image 3/3**: Ongoing mediation.
![AImediator_demoImages6](https://github.com/user-attachments/assets/85f16072-9b3c-4b39-915d-dba176c77613)
