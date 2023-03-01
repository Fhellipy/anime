"use client";
import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: string) {
	const parseValue = (storedValue: string) => {
		if (typeof window === "undefined") return {};
		if (typeof storedValue !== "string") return {};
		try {
			return JSON.parse(storedValue);
		} catch (error) {
			return {};
		}
	};

	const [storedValue, setStoredValue] = useState(() => {
		if (typeof window === "undefined") {
			return parseValue(initialValue);
		}

		try {
			const item = window.localStorage.getItem(key);

			return parseValue(typeof item === "string" ? item : initialValue);
		} catch (error) {
			return parseValue(initialValue);
		}
	});

	const setValue = (value: string | ((value: string) => void)) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);

			if (typeof window !== "undefined") {
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			throw new Error("Error with local storage");
		}
	};

	const value = Object.keys(parseValue(storedValue)).length
		? parseValue(storedValue)
		: storedValue;

	return [value, setValue];
}

export { useLocalStorage };
