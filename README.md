# todo-list

![image](https://github.com/hank20219/todo-list/blob/master/Showcase.png)

## Live demo with StackBlitz

### Steps to run live demo

1. Open [Edit in StackBlitz ⚡️](https://stackblitz.com/edit/node-wo4pak)
2. Run the following commands in opened IDE Terminal:

```
cd todo-list
npm i
ng serve
```

### Steps to run testing on live demo

```
cd todo-list
npm i
ng test --code-coverage
```

## Environment

node.js v16.14.2  
@angular/cli 14.2.5

## Build demo

```
npm i
ng serve
```

## Codebase

![image](https://github.com/hank20219/todo-list/blob/master/Codebase.png)

### /todo-list/src/app

- components
  1. **todo-builder**  
     Contains an input and a button for adding **todo-item**
  2. **todo-item**  
     Basic to-do item. Contains:
     - A checkbox for changing completion status
     - A span for displaying description, can also click to directly switch to edit mode
     - An editable span for editing description
     - A button for toggling edit/display mode
     - A button for deleting current **todo-item**
  3. **todo-list**  
     Container of a full todo list, holds and controls the data of the list. It contains:
     - A header for title displaying
     - A **todo-searcher**
     - A button for changing the sort direction between descending/ascending(default)
     - A button and a dropdown for filter functions
     - A list of **todo-item**
     - A **todo-builder**
  4. **todo-searcher**  
     Contains an input that emits its value on changing and a button to clear the input
- enums
  1. **filter-mode.ts**
     Define mode of filter
- interfaces
  1. **todo-item.ts**
     The interface of basic todo item data structure.
- **app-routing.module.ts**  
  Settings for Angular routing.
- **app.component.html**  
  Container for router-outlet
- **app.module.ts**  
  Angular modules
