import type { ZodError, ZodIssue, ZodObject, ZodRawShape } from "zod";

type FieldKey<S extends ZodRawShape> = Extract<keyof S, string>;

type ZodObjectSchema<S extends ZodRawShape> = ZodObject<S>;

function getErrorElement(input: HTMLInputElement): HTMLParagraphElement | null {
  return (
    input.closest("label")?.querySelector<HTMLParagraphElement>(".error") ??
    null
  );
}

function showError(
  input: HTMLInputElement,
  errorEl: HTMLParagraphElement,
  message: string,
) {
  errorEl.textContent = message;
  input.setAttribute("aria-invalid", "true");
  input.setAttribute("aria-describedby", errorEl.id);
}

function clearError(input: HTMLInputElement, errorEl: HTMLParagraphElement) {
  errorEl.textContent = "";
  input.removeAttribute("aria-invalid");
  input.removeAttribute("aria-describedby");
}

function hasValue(input: HTMLInputElement) {
  return input.value.trim().length > 0;
}

export function createZodFormController<S extends ZodRawShape>(
  form: HTMLFormElement,
  schema: ZodObjectSchema<S>,
) {
  const inputs = Array.from(form.querySelectorAll<HTMLInputElement>("input"));

  const touched = new WeakSet<HTMLInputElement>();

  function markAllTouched() {
    inputs.forEach((input) => touched.add(input));
  }

  function focusFirstInvalid() {
    const firstInvalid = form.querySelector<HTMLInputElement>(
      "[aria-invalid='true']",
    );
    firstInvalid?.focus();
  }

  function clearAllErrors() {
    form
      .querySelectorAll<HTMLInputElement>("[aria-invalid]")
      .forEach((input) => {
        const errorEl = getErrorElement(input);
        if (!errorEl) return;
        clearError(input, errorEl);
      });
  }

  function getFirstErrorMap(issues: ZodIssue[]) {
    const map = new Map<FieldKey<S>, string>();

    for (const issue of issues) {
      const rawField = issue.path[0];
      if (typeof rawField !== "string") continue;

      if (!(rawField in schema.shape)) continue;

      const field = rawField as FieldKey<S>;
      if (map.has(field)) continue;

      map.set(field, issue.message);
    }

    return map;
  }

  function handleZodError(error: ZodError) {
    clearAllErrors();

    const firstErrors = getFirstErrorMap(error.issues);
    for (const [field, message] of firstErrors.entries()) {
      const el = form.elements.namedItem(field);

      if (!(el instanceof HTMLInputElement)) continue;

      const errorEl = getErrorElement(el);
      if (!errorEl) continue;

      showError(el, errorEl, message);
    }
  }

  function validateField(input: HTMLInputElement) {
    const errorEl = getErrorElement(input);
    if (!errorEl) return;

    const fieldName = input.name as FieldKey<S>;
    const fieldSchema = schema.shape[fieldName];
    if (!fieldSchema) return;

    const result = fieldSchema.safeParse(input.value);
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "Invalid value";
      showError(input, errorEl, message);
    } else {
      clearError(input, errorEl);
    }
  }

  function validateForm() {
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    const result = schema.safeParse(formObject);
    if (!result.success) {
      markAllTouched();
      handleZodError(result.error);
      focusFirstInvalid();
      return { ok: false as const, error: result.error };
    }

    clearAllErrors();
    return { ok: true as const, data: result.data };
  }

  function attachFieldValidation() {
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (!touched.has(input)) return;
        validateField(input);
      });

      input.addEventListener("blur", () => {
        touched.add(input);
        if (!hasValue(input)) return;
        validateField(input);
      });
    });
  }

  return {
    form,
    inputs,

    // lifecycle
    attachFieldValidation,

    // validation
    validateField,
    validateForm,

    // errors + UX
    clearAllErrors,
    handleZodError,
    markAllTouched,
    focusFirstInvalid,
  };
}
