<template>
    <div class="warper">
      <RouterView />
    </div>
</template>

<script>
export default {
  name: 'GeneralLayout'
}
</script>

<style lang="less" scoped>
// @import '@/less/base.less';

.warper{
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/bg-layout-geernal.png');
  background-size: cover;
  background-position: center center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  &:after{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.219);
    z-index: -1;
    content: '';
  }
}
</style>

