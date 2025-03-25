import { useState, useRef, useCallback, useEffect } from "react";

// Define a type for elements that have a value property
type ElementWithValue = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/**
 * Custom hook that creates a two-way binding between a form element and React state
 * @param initialValue Initial value for the state
 * @param options Configuration options (e.g. which event to listen for)
 * @returns [refCallback, currentValue, setValue] - Ref to bind to an element, state value, and setter function
 */
export default function useBoundState<T>(
  initialValue: T,
  options: { event?: 'input' | 'change' | 'blur' } = {}
): [React.RefCallback<ElementWithValue>, T, React.Dispatch<React.SetStateAction<T>>] {
  const { event = 'input' } = options;
  const [stateName, setState] = useState<T>(initialValue);
  const elementRef = useRef<ElementWithValue | null>(null);
  const handlerRef = useRef<((e: Event) => void) | null>(null);
  
  // This callback ref pattern ensures we capture when React assigns the DOM element
  const bindRef = useCallback((element: ElementWithValue | null) => {
    // Clean up previous listeners if they exist
    if (elementRef.current && handlerRef.current) {
      elementRef.current.removeEventListener(event, handlerRef.current);
      handlerRef.current = null;
    }
    
    // Store the new element reference
    elementRef.current = element;
    
    // Set up listeners for the new element if it exists
    if (element) {
      // Set initial value
      element.value = String(stateName);
      
      // Create and store the event handler
      const handleChange = (e: Event) => {
        const target = e.target as ElementWithValue;
        setState(target.value as unknown as T);
      };
      
      handlerRef.current = handleChange;
      element.addEventListener(event, handleChange);
    }
  }, [event, stateName]);
  
  // Update DOM element when state changes
  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.value = String(stateName);
    }
  }, [stateName]);
  
  return [bindRef, stateName, setState];
}