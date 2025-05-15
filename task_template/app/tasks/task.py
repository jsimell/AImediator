import os

# define the Task
from task_examples import (
    mediation
)

currentTask = os.environ.get("TASK_NAME")

if currentTask == "mediation":
    task = mediation.Mediation()
