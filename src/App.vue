<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { addDecimal, getNumberValue } from '@/helpers/utils';
import useNumberInput from '@/composables/useNumberInput';

const betValues = [5, 10, 50, 100, 500, 1000];
const defuseValues = [1.5, 2, 5];
const betInput = ref<null | HTMLInputElement>(null);
const {
  min: betMinAmount,
  max: betMaxAmount,
  value: betAmount,
  setValue: setBetAmount,
  formattedValue: betFormattedValue,
  handleKeyDown: handleBetInputKeyDown,
  handlePaste: handleBetInputPaste,
} = useNumberInput({
  defaultValue: 10,
  min: 10,
  max: 3000,
  decimals: 0,
});
const {
  value: defuseAmount,
  setValue: setDefuseAmount,
  formattedValue: defuseFormattedValue,
  handleKeyDown: handleDefuseInputKeyDown,
  handlePaste: handleDefuseInputPaste,
} = useNumberInput({
  defaultValue: 1.01,
  min: 1.01,
  max: 100,
  decimals: 2,
});

function shortenNumber (num: number) {
  if (num < 1000) {
    return num;
  }

  return `${Math.floor(num / 1000)}K`;
}

onMounted(() => {
  if (!betInput.value) {
    return;
  }

  betInput.value?.focus();
});
</script>

<template>
  <div>
    <div class="flex flex-col gap-2 p-2 md:(flex-row items-stretch justify-center max-w-220 mx-auto)">
      <!-- bet box -->
      <div class="box md:(basis-1/2)">
        <div class="flex flex-center p-3 gap-2">
          <!-- min max -->
          <div class="flex flex-col flex-center gap-2">
            <button class="btn w-14" @click="setBetAmount(betMinAmount, true)">
              MIN
            </button>
            <button class="btn w-14" @click="setBetAmount(betMaxAmount, true)">
              MAX
            </button>
          </div>
          <!-- input -->
          <div class="flex-1 basis-2 flex flex-center">
            <div class="text-xl text-center font-700 w-10">
              ¥
            </div>
            <input
              ref="betInput"
              v-model="betFormattedValue"
              type="text"
              class="input"
              maxlength="4"
              @keydown="handleBetInputKeyDown"
              @input="setBetAmount(($event?.target as HTMLInputElement)?.value)"
              @blur="setBetAmount(($event?.target as HTMLInputElement)?.value, true)"
              @focus="setBetAmount(($event?.target as HTMLInputElement)?.value, true)"
              @paste="handleBetInputPaste"
            >
          </div>
          <!-- 1/2 2X -->
          <div class="flex flex-col flex-center gap-2">
            <button
              class="btn w-14 text-white text-opacity-60"
              @click="setBetAmount(getNumberValue(betAmount) / 2, true)"
            >
              1/2
            </button>
            <button
              class="btn w-14 text-white text-opacity-60"
              @click="setBetAmount(getNumberValue(betAmount) * 2, true)"
            >
              2X
            </button>
          </div>
        </div>
        <!-- bet values -->
        <div class="border-t border-t-blue-500 border-opacity-20 flex flex-wrap flex-center p-3 gap-2">
          <button
            v-for="betValue in betValues"
            :key="betValue"
            class="btn flex-1 text-cyan-400 text-opacity-70"
            :class="betValue >= 1000 ? 'md:(display-none)' : ''"
            @click="setBetAmount(getNumberValue(betAmount) + betValue, true)"
          >
            {{ `+${shortenNumber(betValue)}` }}
          </button>
        </div>
      </div>
      <!-- defuse box -->
      <div class="box md:(basis-1/4 flex flex-col)">
        <!-- input -->
        <div class="flex flex-center flex-grow p-3 md:(flex-col)">
          <div class="basis-1/2 text-white text-opacity-50">
            DEFUSE AT
          </div>
          <div class="basis-1/2 flex flex-center">
            <button
              class="btn w-8"
              @click="setDefuseAmount(addDecimal(getNumberValue(defuseAmount), -0.1), true)"
            >
              -
            </button>
            <input
              v-model="defuseFormattedValue"
              type="text"
              class="input"
              maxlength="6"
              @keydown="handleDefuseInputKeyDown"
              @input="setDefuseAmount(($event?.target as HTMLInputElement)?.value)"
              @blur="setDefuseAmount(($event?.target as HTMLInputElement)?.value, true)"
              @focus="setDefuseAmount(($event?.target as HTMLInputElement)?.value, true)"
              @paste="handleDefuseInputPaste"
            >
            <button
              class="btn w-8"
              @click="setDefuseAmount(addDecimal(getNumberValue(defuseAmount), (getNumberValue(defuseAmount) >= 2 ? 1 : 0.1)), true)"
            >
              +
            </button>
          </div>
        </div>
        <!-- defuse values -->
        <div class="display-none border-t border-t-blue-500 border-opacity-20 md:(display-block flex flex-wrap flex-center p-3 gap-2)">
          <button
            v-for="defuseValue in defuseValues"
            :key="defuseValue"
            class="btn flex-1"
            @click="setDefuseAmount(defuseValue, true)"
          >
            {{ `${defuseValue.toFixed(1)}x` }}
          </button>
        </div>
      </div>
      <button
        class="btn btn--gradient rounded-lg w-full h-20 text-xl font-700
        md:(basis-1/4 h-auto)"
      >
        BET
      </button>
    </div>
  </div>
  <!-- debug -->
  <div class="text-center mt-4">
    {{ { betAmount, defuseAmount } }}
  </div>
</template>
