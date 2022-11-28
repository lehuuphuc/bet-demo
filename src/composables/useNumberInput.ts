import { computed, ref } from 'vue';
import { getNumberValue } from '@/helpers/utils';

export default function useNumberInput (
  { defaultValue, min, max, decimals }: {
    defaultValue?: number | string | undefined;
    min: number | undefined;
    max: number | undefined;
    decimals: number | undefined;
  }) {
  const formattedValue = ref(defaultValue);
  const localValue = ref(defaultValue);
  const isWithDecimal = typeof decimals === 'number' && decimals > 0;
  const regexString = `^\\d+${isWithDecimal ? (`(\\.\\d{1,${decimals}})?`) : ''}`; // /^\d+(\.\d{1,2})?/ or /^\d+/
  const regex = new RegExp(regexString);

  function processValue (event: string) {
    const matches = (event ?? '').trim().match(regex);
    let number = matches && matches?.length > 0 ? +matches[0] : 0;

    if (typeof min === 'number' && number < min) {
      number = min;
    }

    if (typeof max === 'number' && number > max) {
      number = max;
    }

    localValue.value = isWithDecimal ? number : number;
  }

  function handleKeyDown (event: KeyboardEvent) {
    // allow ctrl + a, ctrl + c, ctrl + v
    if (['a', 'c', 'v'].includes(event.key)
    && (event.ctrlKey || event.metaKey)) {
      return;
    }

    // allow arrows, backspace, delete, tab, enter, escape, number
    const allowKeys = [
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete', 'Backspace', 'Tab', 'Enter', 'Escape',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    ];

    // allow dot
    if (isWithDecimal) {
      allowKeys.push('.');
    }

    if (allowKeys.includes(event.key)) {
      return;
    }

    event.preventDefault();
  }

  function handlePaste () {
    setTimeout(() => {
      setValue(formattedValue.value, true);
    }, 100);
  }

  function setValue (event: number | string | undefined, updateFormattedValue = false) {
    processValue((event ?? '').toString());

    if (!updateFormattedValue) {
      return;
    }

    formattedValue.value = isWithDecimal ? getNumberValue(localValue.value).toFixed(decimals) : localValue.value;
  }

  setValue(defaultValue, true);

  return {
    min,
    max,
    decimals,
    value: computed(() => {
      return localValue.value;
    }),
    formattedValue,
    setValue,
    handleKeyDown,
    handlePaste,
  };
}
