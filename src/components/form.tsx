"use client"
import React, { isValidElement, useState } from 'react';
import Loading from 'cp/loading'

function create<Type>(c: { new(): Type }): Type {
  return new c();
}

enum errorType {
  required = "required",
  minlength = "minlength",
}

interface Props<T> {
  children: React.ReactNode,
  onService: (value: T) => void,
  textBtn?: string,
}

export default function Form<T>({ children, textBtn, onService }: Props<T>) {
  const [loading, setLoading] = useState(false);

  function validateError(children: React.ReactNode, isError: boolean): boolean {
/*
    for (const child_1 of children) {
      if (child_1 instanceof HTMLSpanElement) {
        hiddenSpan(child_1)
      }
    }

    //--------------------------------------------------

    function searchSpan(elementFather: HTMLInputElement | HTMLSelectElement) {
      for (const child_1 of children) {
        if (child_1 instanceof HTMLSpanElement) {
          if (elementFather.id === child_1.dataset.for) {
            if (elementFather.value === "" && child_1?.dataset?.required) {
              showSpan(child_1, errorType.required)
              isError = true;
              break;
            }

            if (child_1?.dataset.minlength && elementFather.value?.length < parseInt(child_1?.dataset?.minlength?.split(",")[0])) {
              showSpan(child_1, errorType.minlength)
              isError = true;
              break;
            }
          }
        }
      }
    }

    for (const child of children) {
      if (child instanceof HTMLInputElement) {
        searchSpan(child);
      }

      if (child instanceof HTMLSelectElement) {
        searchSpan(child);
      }

      if (child?.children) {
        isError = validateError(child?.children, isError)
      }
    }

    //--------------------------------------------------

    if (!isError)
      for (const child_1 of children) {
        if (child_1 instanceof HTMLSpanElement) {
          const span = document.querySelector(`.${child_1.classList[0].trim()}`)
          span.style.visibility = 'hidden';
        }
      }

    return isError;
    */
    return false;
  }

  async function handlerSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);

    const formDataObject: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value.toString();
    });

    let isError: boolean = false;
    const childrenArray: Element[] = Array.from((event.target as HTMLFormElement).children);
    isError = validateError(childrenArray, isError);

    if (!isError) {
      await onService(formDataObject as T);
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handlerSubmit}>
      {loading && <Loading id='form-load-svg' />}
      {children}
      <button disabled={loading}>{textBtn ?? "Send"}</button>
    </form>
  );
}

function showSpan(child: HTMLSpanElement, _errorType: errorType) {
  const span: HTMLSpanElement = document.querySelector(`.${child.classList[0].trim()}`)

  if (_errorType == errorType.required)
    span.innerHTML = child.dataset.required;
  if (_errorType == errorType.minlength)
    span.innerHTML = child.dataset.minlength.split(",")[1];

  span.style.visibility = "visible";
}

function hiddenSpan(child: HTMLSpanElement) {
  const span: HTMLSpanElement = document.querySelector(`.${child.classList[0].trim()}`)
  span.style.visibility = "hidden";
}

type SpanProps = {
  id: string,
  htmlFor: string,
  className?: string,
  select?: string,
  required?: string,
  minlength?: string,
}

export function Span({ id, htmlFor, select, required, minlength, className = "" }: SpanProps) {

  const Style: React.CSSProperties = {
    color: "red",
    visibility: 'hidden'
  }

  return (<span
    id={id}
    className={`class_${htmlFor} ${className}`}
    style={Style}
    data-select={select}
    data-for={htmlFor}
    data-required={required}
    data-minlength={minlength}
  ></span >)
}

function removeDoubleDot(id: string): string {
  return id.replace(':', '').replace(':', '');
}