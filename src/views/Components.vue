<script setup lang="ts">
import {ref} from  'vue'

/** Preview Image */
const preview:any =            ref(null)
const custom_choose_file:any = ref(null)
const PreviewImage =           (event:any) => {

    //Validate Type file (Only)
    let arrayType:string[] = ['image/jpeg','image/png']
    console.log(event.target.files[0].type)
    if(!arrayType.includes(event.target.files[0].type)){
        return alert('กรุณาเลือกไฟล์ ที่มีนามสกุล jpg,png หรือ gif เท่านั้น')
    }

    //Image size must not exceed 2 MB.
    if(event.target.files[0].size >= 2097152){
        return alert('ขนาดไฟล์รูปภาพต้องไม่เกิน 2MB')
    }

    //Set Value to img tag (Preview Image) 
    let output:any = preview.value
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src)  // Free memory
    }
    custom_choose_file.value.classList.add('preview')

}

</script>
<template>
    <div class="p-10">
        <h2>Components</h2>
        <!-- Button -->
        <div class="flex flex-wrap gap-5 my-5">
            <button type="button" class="btn btn_primary">ปุ่มกด</button>
            <button type="button" class="btn btn_secondary">ปุ่มกด</button>
            <button type="button" class="btn btn_success">ปุ่มกด</button>
            <button type="button" class="btn btn_danger">ปุ่มกด</button>
            <button type="button" class="btn btn_warning">ปุ่มกด</button>
            <button type="button" class="btn btn_info ">ปุ่มกด</button>
            <button type="button" disabled class="btn btn_primary">ปุ่มกด</button>
            <button type="button" class="btn btn_primary w-icon">
                <span class="la la-whatsapp ltr:mr-2"></span> ปุ่มกด
            </button>
        </div>
        <!-- Input -->
        <div class="grid grid-cols-3 gap-5">
            <!-- Left -->
            <div>
                <!-- Input Text Rounded Full -->
                <div class="mt-5">
                    <label class="label block mb-1" for="inpu2">Label</label>
                    <input id="input" type="text" class="form-control rounded-full" placeholder="Enter text here">
                </div>

                <!-- Input -->
                <div class="mt-5">
                    <label class="label block mb-1" for="input-2">Label</label>
                    <input id="input-2" type="text" class="form-control rounded-md" placeholder="Enter text here">
                </div>

                <!-- Input Layout -->
                <div class="mt-8 relative">
                    <label class="label absolute block top-0 mt-2 ltr:ml-4 rtl:mr-4 font-heading" for="input-3">Label</label>
                    <input id="input-3" type="text" class="form-control rounded-md pt-8" placeholder="Enter text here">
                </div>

                <!-- Text Area -->
                <div class="mt-5">
                    <label class="label block mb-1" for="textarea">Label</label>
                    <textarea class="form-control rounded-md" id="textarea" rows="5" placeholder="Textarea"></textarea>
                </div>

                <!-- Select -->
                <div class="mt-5">
                    <label class="label block mb-1" for="select">Label</label>
                    <div class="custom-select">
                        <select class="form-control rounded-md" id="select">
                            <option>Select</option>
                            <option>Option</option>
                        </select>
                        <div class="custom-select-icon la la-caret-down text-xl"></div>
                    </div>
                </div>

                <!-- Select Round Full -->
                <div class="mt-5">
                    <label class="label block mb-1" for="select-full">Label</label>
                    <div class="custom-select">
                        <select class="form-control rounded-full" id="select-full">
                            <option>Select</option>
                            <option>Option</option>
                        </select>
                        <div class="custom-select-icon la la-caret-down text-xl"></div>
                    </div>
                </div>

                <!-- CheckBox -->
                <div class="mt-7 grid grid-cols-3">
                    <label class="custom-checkbox">
                        <input type="checkbox" >
                        <span></span>
                        <span>Node JS</span>
                    </label>
                    <label class="custom-checkbox">
                        <input type="checkbox" checked="">
                        <span></span>
                        <span>Python</span>
                    </label>
                </div>

                <!-- Radio -->
                <div class="mt-7 grid grid-cols-3">
                    <label class="custom-radio">
                        <input type="radio" name="radio">
                        <span></span>
                        <span>Male</span>
                    </label>
                    <label class="custom-radio">
                        <input type="radio" name="radio" checked="">
                        <span></span>
                        <span>Fremale</span>
                    </label>
                </div>

                <!-- Select Open with layout -->
                <div class="mt-8 border border-red-500 rounded-md bg-white font-light relative">
                    <label for="select_layout1" class="block pt-3 pl-3 pr-3 pb-2">Select Layout 1</label>
                    <select class="focus:outline-none appearance-none w-full bg-transparent pl-3 pr-3 pb-3 font-extralight" id="select_layout1">
                        <option value="">กรุงเทพมหานคร</option>
                        <option value="">บึงกาฬ</option>
                    </select>
                    <div class="custom-select-icon la la-caret-down text-xl top-[30px] right-[-10px]"></div>
                </div>
                <small class="block mt-2 invalid-feedback">This is help text.</small>

                <div class="mt-8 border border-red-500 rounded-md bg-white font-light relative">
                    <label for="select_layout1" class="block pt-3 pl-3 pr-3 pb-2">Select Layout 1</label>
                    <select class="focus:outline-none appearance-none w-full bg-transparent pl-3 pr-3 pb-3 font-extralight" id="select_layout1">
                        <option value="">กรุงเทพมหานคร</option>
                        <option value="">บึงกาฬ</option>
                    </select>
                    <div class="custom-select-icon la la-caret-down text-xl top-[30px] right-[-10px]"></div>
                </div>
                <small class="block mt-2 invalid-feedback">This is help text.</small>

            </div>
            <!-- Center -->
            <div>
                <!-- Input Text invalid Rounded Full -->
                <div class="mt-5">
                    <label class="label block mb-1" for="inpu-r-2">Label</label>
                    <input id="inpu-r-2" type="text" class="form-control rounded-full is-invalid" placeholder="Enter text here">
                    <small class="block mt-2 invalid-feedback">This is help text.</small>
                </div>

                <!-- Input Text invalid Rounded Full -->
                <div class="mt-5">
                    <label class="label block mb-1" for="inpu-r-3">Label</label>
                    <input id="inpu-r-3" type="text" class="form-control rounded-md is-invalid" placeholder="Enter text here">
                    <small class="block mt-2 invalid-feedback">This is help text.</small>
                </div>

                 <!-- Input Layout -->
                <div class="mt-8 relative">
                    <label class="label absolute block top-0 mt-2 ltr:ml-4 rtl:mr-4 font-heading" for="input-3">Label</label>
                    <input id="input-r-3" type="text" class="form-control rounded-md pt-8 is-invalid" placeholder="Enter text here">
                </div>

                <!-- Text Area -->
                <div class="mt-5">
                    <label class="label block mb-1" for="textarea-r">Label</label>
                    <textarea class="form-control rounded-md is-invalid" id="textarea-r" rows="5" placeholder="Textarea"></textarea>
                </div>

                <!-- Select -->
                <div class="mt-5">
                    <label class="label block mb-1" for="select-r">Label</label>
                    <div class="custom-select">
                        <select class="form-control rounded-md is-invalid" id="select-r">
                            <option>Select</option>
                            <option>Option</option>
                        </select>
                        <div class="custom-select-icon la la-caret-down text-xl"></div>
                    </div>
                </div>

                <!-- Select Round Full -->
                <div class="mt-5">
                    <label class="label block mb-1" for="select-r-full">Label</label>
                    <div class="custom-select">
                        <select class="form-control rounded-full is-invalid" id="select-r-full">
                            <option>Select</option>
                            <option>Option</option>
                        </select>
                        <div class="custom-select-icon la la-caret-down text-xl"></div>
                    </div>
                </div>

                <!-- CheckBox -->
                <div class="mt-7 grid grid-cols-3">
                    <label class="custom-checkbox is-invalid">
                        <input type="checkbox" >
                        <span></span>
                        <span>Node JS</span>
                    </label>
                    <label class="custom-checkbox is-invalid">
                        <input type="checkbox" >
                        <span></span>
                        <span>Python</span>
                    </label>
                </div>

                <!-- Radio -->
                <div class="mt-7 grid grid-cols-3">
                    <label class="custom-radio is-invalid">
                        <input type="radio" name="radio">
                        <span></span>
                        <span>Male</span>
                    </label>
                    <label class="custom-radio is-invalid">
                        <input type="radio" name="radio" >
                        <span></span>
                        <span>Fremale</span>
                    </label>
                </div>

                

            </div>
            <!-- Right -->
            <div class="grid grid-cols-2 gap-5">
                <div>
                    <label class="label">Input File view preview</label>
                    <label for="fileUpload1" ref="custom_choose_file" class="custom-choose-file">
                        <span class="las la-image"></span>
                        <div class="choose">
                            <span class="las la-mouse-pointer"></span>
                            <span class="text">Choose File</span>
                        </div>
                        <img src="" ref="preview">
                    </label>
                    <input type="file" id="fileUpload1" accept="image/jpeg,image/png" @change="PreviewImage($event)" class="hidden">
                </div>
                <div>
                    <label class="label">Input File view preview</label>
                    <label for="fileUpload2" class="custom-choose-file preview">
                        <span class="las la-image"></span>
                        <div class="choose">
                            <span class="las la-mouse-pointer"></span>
                            <span class="text">Choose File</span>
                        </div>
                        <img src="/src/assets/images/m1.png">
                    </label>
                    <input type="file" id="fileUpload2"  class="hidden">
                </div>
            </div>
        </div>

        <ul class="mt-5 custom-pagination">
            <li class="first"><a href=""><i class="la la-angle-double-left"></i></a></li>
            <li class="prev"><a href=""><i class="las la-caret-left"></i></a></li>
            <li class="page"><a href="">1</a></li>
            <li class="page"><a href="">2</a></li>
            <li class="page"><a href="">3</a></li>
            <li class="page"><a href="">...</a></li>
            <li class="page"><a href="">7</a></li>
            <li class="page"><a href="">8</a></li>
            <li class="page"><a href="">9</a></li>
            <li class="page active"><a href="">10</a></li>
            <li class="page"><a href="">...</a></li>
            <li class="page"><a href="">15</a></li>
            <li class="page"><a href="">16</a></li>
            <li class="page"><a href="">17</a></li>
            <li class="next"><a href=""><i class="las la-caret-right"></i></a></li>
            <li class="last"><a href=""><i class="las la-angle-double-right"></i></a></li>
        </ul>
    </div>
</template>



<style lang="less" scoped>
    /** Style Choose File Upload */
    .custom-choose-file{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 180px;
        height: 180px;
        background: #D1D5DB;
        border-radius: 6px;
        transition: 0.3s;
        overflow: hidden;
        &:hover{
            background: #cacbcd;
        }
        &.w-full{
            width: 100%;
        }
        .la-image{
            display: block;
            &:before{
                color: #2936A8;
                font-size: 110px;
            }
        }
        .choose{
            margin-top:-10px;
            cursor: pointer;
            .la-mouse-pointer{
                &:before{
                    color: #2936A8;
                    font-size: 20px;
                    display: block;
                    transform: translateY(3px);
                }
            }
            .text{
                color: #2936A8;
            }
        }
        img{
            display: none;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        &.preview{
            position: relative;
            background: unset;
            border:1px solid #D1D5DB;
            &:hover{
                background: unset;
            }
            .la-image{
                display: none;
            }
            .choose{
                position: relative;
                z-index: 1;
                background: #d1d5db82;
                border-radius: 6px;
                padding: .3rem 1rem;
                box-shadow: 0 4px 4px rgba(0, 0, 0, 0.28);
                transition: 0.3s;
                &:hover{
                    background: #d1d5db;
                }
            }
            img{
                position: absolute;
                display: unset;
            }
        }
    }

    @import '@/assets/less/pagination.less';
</style>