# Todo App

A modern Todo application that allows users to create, organize, and manage tasks with filtering, drag-and-drop reordering, and smooth UI animations.

Built as part of a Frontend Mentor challenge, this project focuses on reducer-based state management, lifecycle-safe UI architecture, and testable domain logic using vanilla JavaScript and TypeScript.

---

## Technologies used

- Astro
- TypeScript
- SCSS
- Vanilla JavaScript
- GSAP (Flip)
- SortableJS
- Zod (`astro:schema`)
- Vitest
- LocalStorage

---

## Features

- Add new todos
- Mark todos as completed
- Delete todos
- Filter todos by:
  - All
  - Active
  - Completed
- Clear all completed todos
- Drag & drop to reorder tasks
- Persistent todos using LocalStorage
- Accessible form validation
- Light and dark theme
- Responsive layout for all screen sizes
- Smooth UI transitions using GSAP Flip
- Reduced-motion support

---

## Architecture

The application follows a reducer-based architecture implemented using vanilla JavaScript.

User Interaction → Event Layer → Store Dispatch → Reducer → State Update → Subscribers → UI Updates

### Reducer-Driven State Management

All application state is managed through a reducer.

```ts
type State = {
  todos: Todo[];
  filter: Filter;
}
```

Actions describe what happened, while the reducer determines how state changes.

```ts
{ type: "todo/add", text }
{ type: "todo/delete", id }
{ type: "todo/toggle", id, checked }
{ type: "todo/reorder", orderedIds }
{ type: "todo/clearCompleted" }
{ type: "filter/set", filter }
```

Reducers are designed to be:
- Pure
- Deterministic
- Side-effect free

This keeps business logic isolated and easily testable.

---

### Selector Layer

Selectors derive data from state without mutating it.

Examples:
- `selectActiveCount(state)`
- `selectVisibleTodos(state)`

This prevents derived values from being duplicated or stored inside the state itself.

---

### Store and Subscription Lifecycle

The custom store implementation provides:

```ts
store.getState()
store.dispatch(action)
store.subscribe(listener)
```

Subscribers react to state changes and update different parts of the UI.

Examples of subscribers:
- Rendering the todo list
- Updating the "items left" counter
- Persisting todos to LocalStorage
- Updating filter button states
- Each subscription returns a cleanup function, enabling proper teardown when the feature is destroyed.

---

### UI Layer

The UI layer is responsible for:
- DOM rendering
- Event handling
- Animations
- Accessibility

Rendering uses a keyed DOM reconciliation approach:
- Existing DOM nodes are reused
- Nodes are moved instead of recreated
- Only missing nodes are cloned from templates
- Removed nodes are explicitly deleted

This enables smooth GSAP Flip animations while maintaining high performance

---

### Drag & Drop

Drag-and-drop functionality is implemented using SortableJS.

When a drag operation finishes:
1. The DOM order is read
2. A list of ordered IDs is dispatched
3. The reducer maps the new order back onto existing order values

This ensures drag interactions remain consistent with the application's state model.

---

### Animation System

Animations are handled using GSAP Flip.

Flip works by capturing the layout state before a render and animating elements to their new positions after the DOM updates.

Reduced-motion preferences are respected using gsap.matchMedia.

### Persistence

Todos are persisted in LocalStorage.

Data is validated before being accepted into the application using Zod to guard against corrupted or malformed storage payloads.

---

## What I leanred

- Designing reducer-based state management
- Building a lightweight store and subscription system
- Managing lifecycle concerns such as teardown, cleanup, and event listener removal
- Structuring a vanilla JavaScript application with clear architectural layers
- Writing unit tests for reducers, selectors, and persistence logic using Vitest
- Using Zod to validate user input and persisted data
- Implementing drag-and-drop interactions while keeping state consistent
- Using GSAP Flip for layout animations while respecting reduced-motion preferences
- Separating domain logic from UI rendering for better maintainability and testability

---

## Live Demo

test

---

## Preview

