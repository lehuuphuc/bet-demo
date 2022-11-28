<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { addDecimal, getNumberValue } from '@/helpers/utils';
import useNumberInput from '@/composables/useNumberInput';

const betValues = [5, 10, 50, 100, 500, 1000];
const defuseValues = [1.5, 2, 5];
const isSubmitted = ref(false);
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
  min: defuseMinAmount,
  max: defuseMaxAmount,
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
const defuseIncreaseValue = computed(() =>
  (getNumberValue(defuseAmount.value) >= 2 ? 1 : 0.1));
const shouldDisableBtnDecreaseDefuse = computed(() => defuseAmount.value === defuseMinAmount);
const shouldDisableBtnIncreaseDefuse = computed(() => defuseAmount.value === defuseMaxAmount);

function shortenNumber (num: number) {
  if (num < 1000) {
    return num;
  }

  return `${Math.floor(num / 1000)}K`;
}

function shouldDisableAddBetValue (betValue: number) {
  const result = getNumberValue(betAmount.value) + betValue;

  if (typeof betMaxAmount === 'number' && result >= betMaxAmount) {
    return true;
  }

  if (typeof betMinAmount === 'number' && result <= betMinAmount) {
    return true;
  }

  return false;
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
            <button
              :disabled="isSubmitted"
              class="btn w-14"
              :class="{ 'btn--disabled': isSubmitted }"
              @click="setBetAmount(betMinAmount, true)"
            >
              MIN
            </button>
            <button
              :disabled="isSubmitted"
              class="btn w-14"
              :class="{ 'btn--disabled': isSubmitted }"
              @click="setBetAmount(betMaxAmount, true)"
            >
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
              :disabled="isSubmitted"
              class="input"
              :class="{ 'input--disabled': isSubmitted }"
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
              :disabled="isSubmitted"
              class="btn w-14 text-white text-opacity-60"
              :class="{ 'btn--disabled': isSubmitted }"
              @click="setBetAmount(getNumberValue(betAmount) / 2, true)"
            >
              1/2
            </button>
            <button
              :disabled="isSubmitted"
              class="btn w-14 text-white text-opacity-60"
              :class="{ 'btn--disabled': isSubmitted }"
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
            :class="{
              'md:(display-none)': betValue >= 1000,
              'btn--disabled': isSubmitted || shouldDisableAddBetValue(betValue),
            }"
            :disabled="isSubmitted || shouldDisableAddBetValue(betValue)"
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
              :disabled="isSubmitted || shouldDisableBtnDecreaseDefuse"
              class="btn w-8"
              :class="{ 'btn--disabled': isSubmitted || shouldDisableBtnDecreaseDefuse }"
              @click="setDefuseAmount(addDecimal(getNumberValue(defuseAmount), -0.1), true)"
            >
              -
            </button>
            <input
              v-model="defuseFormattedValue"
              :disabled="isSubmitted"
              type="text"
              class="input"
              :class="{ 'input--disabled': isSubmitted }"
              maxlength="6"
              @keydown="handleDefuseInputKeyDown"
              @input="setDefuseAmount(($event?.target as HTMLInputElement)?.value)"
              @blur="setDefuseAmount(($event?.target as HTMLInputElement)?.value, true)"
              @focus="setDefuseAmount(($event?.target as HTMLInputElement)?.value, true)"
              @paste="handleDefuseInputPaste"
            >
            <button
              :disabled="isSubmitted || shouldDisableBtnIncreaseDefuse"
              class="btn w-8"
              :class="{ 'btn--disabled': isSubmitted || shouldDisableBtnIncreaseDefuse }"
              @click="setDefuseAmount(addDecimal(getNumberValue(defuseAmount), defuseIncreaseValue), true)"
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
            :disabled="isSubmitted"
            class="btn flex-1"
            :class="{ 'btn--disabled': isSubmitted }"
            @click="setDefuseAmount(defuseValue, true)"
          >
            {{ `${defuseValue.toFixed(1)}x` }}
          </button>
        </div>
      </div>
      <button
        :disabled="isSubmitted"
        class="btn btn--gradient rounded-lg w-full h-20 text-xl font-700
        md:(basis-1/4 h-auto)"
        :class="{ 'btn--disabled': isSubmitted }"
        @click="isSubmitted = true"
      >
        {{ isSubmitted ? 'BET PLACED' : 'BET' }}
      </button>
    </div>
  </div>
  <!-- debug -->
  <div class="text-center mt-4">
    {{ { betAmount, defuseAmount } }}
  </div>
</template>
