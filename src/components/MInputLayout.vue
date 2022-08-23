<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
    type:        {type: String, required: true},
    label:       {type: String, required: true },
    forInput:    {type: String, required: true },
    placeholder: {type: String, required: false },
    v$:          {type: Object, required: true},
    rows:        {type: String, required: false},
    modelValue:  {
        type: [String, Number, Boolean],
        required: false,
        default: null,
    },
    errors_msg:  {type: Object, required: false},
    options:     {type: Array, required: false},
    className:   {type: String, required: false}
})


</script>
<template>
    <!-- Warper Input Layout -->
    <div class="relative" :class="className">
        <label class="label absolute block top-0 mt-2 ltr:ml-4 rtl:mr-4 font-heading z-10" :for="forInput">{{ label }}</label>

        <!-- Input Type Text -->
        <input v-if="type == 'text'" :id="forInput" :value="modelValue" :placeholder="placeholder"
               @input="$emit('update:modelValue', $event.target.value)"
               type="text" class="form-control rounded-md pt-8" :class="{ 'is-invalid' : v$.$dirty && v$.$invalid }">
        
        <!-- Input Type Textarea -->
        <textarea v-if="type == 'textarea'" :id="forInput" :value="modelValue" :placeholder="placeholder" 
              @input="$emit('update:modelValue', $event.target.value)" :class="{ 'is-invalid' : v$.$dirty && v$.$invalid }"
              :rows="rows" class="form-control rounded-md pt-8" ></textarea>

        <!-- Input Type Select -->
        <div v-if="type == 'select'" class="border border-[#D1D5DB] rounded-md bg-white font-light relative"
             :class="{'border-[#DC3545]' : v$.$dirty && v$.$invalid}">
            <select :id="forInput" @input="$emit('update:modelValue', $event.target.value)" :value="modelValue"
                    class="focus:outline-none appearance-none w-full bg-transparent pl-3 pr-3 pb-2 font-extralight mt-8" >
                <option value="">-- เลือก --</option>
                <option v-for="op in options" v-bind:key="op.value" :value="op.value">{{ op.label }}</option>
            </select>
            <div class="custom-select-icon la la-caret-down text-xl top-[30px] right-[-10px]"></div>
        </div>

        <!-- Error -->
        <template v-if="v$.$dirty && v$.$invalid">
            <small class="block invalid-feedback" v-if="v$.required.$invalid">{{ errors_msg.required }}</small>
        </template>
        <!-- ./ Error -->
    </div>
    <!-- ./ Warper Input Layout -->
</template>

