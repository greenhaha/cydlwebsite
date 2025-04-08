<template>
  <div class="flex flex-col items-center justify-center w-full h-full pt-[60px]">
    <div class="fixed inset-0 w-full h-full">
      <div class="pointer-events-none absolute inset-0">
        <video
          src="../assets/bg/baierduo.mp4"
          muted
          autoplay="true"
          class="w-full h-full bg-cover bg-center min-w-full min-h-full object-cover globalVideo"
          loop="true"
          preload="metadata"
          transition="all duration-100 cubic-bezier(.4,0,.2,1)"
        ></video>
      </div>
    </div>
    <div class="home-grass pointer-events-none fixed inset-0 z-0"></div>
    <div class="grid-containerSearch mt-4 py-[24px]"></div>
    <div class="grid-container mt-4 bg-[white] rounded-[4px]">
      <n-collapse default-expanded-names="1" accordion class="p-4">
        <n-collapse-item title="如何绑定Steam账号？" name="1">
          <div>
            在绑定页面中请点击页面上的“获取Steam 64位
            ID”按钮，并按照提示进行操作。注意：在绑定前请确保自己打开游戏加速，可以正常访问steam社区，然后再进行获取Steam
            64位 ID操作。
          </div>
        </n-collapse-item>
        <n-collapse-item title="绑定的方式有哪几种？" name="2">
          <div>目前只有2种绑定方式: 1.网页 2.游戏内</div>
        </n-collapse-item>
        <n-collapse-item title="如何在游戏内绑定账号？" name="3">
          <div>进入社区服务器，打开聊天窗口，输入'!bind空格+QQ号'即可绑定。</div>
        </n-collapse-item>
        <n-collapse-item title="如何在游戏内查看自己steam64位ID？" name="4">
          <div>进入社区服务器，打开聊天窗口，输入'!steamid'即可查看自己的steam64位ID。</div>
        </n-collapse-item>
        <n-collapse-item title="进入服务器发现贴图错误或者地图丢失无法进入服务器怎么办？" name="5">
          <div>
            这个问题
            首先排查网络，其次有可能是因为本地没有订阅创意工坊，本地文件与服务器不一致导致。请删除本地相关社区文件即可。如果有其他问题请加群询问群管理。
            <a
              href="https://qm.qq.com/cgi-bin/qm/qr?k=Sh4gcapxVV57FqXxe7ZU07-v9u8YvKVN&jump_from=webapi&authKey=HiFkDO97IWzVgJEO6SWn59U3r7vJPEfvGNq8+Y4RVgOHFRN8+CB9WhpjYJmRvyky"
              target="_blank"
              rel="noopener noreferrer"
              ><n-button quaternary type="info"> 加入QQ群 342289459 </n-button></a
            >
          </div>
        </n-collapse-item>
        <n-collapse-item title="如何订阅社区创意工坊" name="6">
          <div>
            国内用户打开创意工坊前请开启加速器，然后点击下方链接进入创意工坊订阅地图或者贴图。
            <a
              href="https://steamcommunity.com/sharedfiles/filedetails/?id=3245952520"
              target="_blank"
              rel="noopener noreferrer"
              ><n-button quaternary type="info">创意工坊</n-button></a
            >
          </div>
        </n-collapse-item>
        <n-collapse-item title="网站账号支持QQ号绑定吗？" name="7">
          <div>
            支持，由于当前服务器交流社区主要为QQ群，所以目前仅支持QQ号的绑定方式，后续会添加更多绑定方式。
          </div>
        </n-collapse-item>
        <n-collapse-item title="绑定账号有什么好处？" name="8">
          <div>绑定账号可以让您更方便地管理和使用我们的服务。</div>
        </n-collapse-item>
        <n-collapse-item title="如何更改绑定的账号？" name="9">
          <div>解绑功能正在开发中，目前暂不支持解绑操作，不久之后将会上线。</div>
        </n-collapse-item>
        <n-collapse-item title="会像其他社区一样具有网页商店功能并且和游戏数据互通吗？" name="10">
          <div>网页商店功能正在开发中，未来将会实现积分和仓库同步，尽情期待！</div>
        </n-collapse-item>
        <n-collapse-item title="如何获取积分？" name="11">
          <div>
            且由于我们是公益服，所有有效积分只能通过服务器内或者签到获取，并且不会上线积分充值功能，后续也会添加更多的获取积分方式。
          </div>
        </n-collapse-item>
        <n-collapse-item title="如何支持我们？" name="12">
          <div>
            如果您对我们的服务器感兴趣，可以加入我们的QQ群了解关于服务器的更多信息，也可以为开发团队提供一定的赞助资金，帮助我们更好的建设服务器！
            <a
              href="https://qm.qq.com/cgi-bin/qm/qr?k=Sh4gcapxVV57FqXxe7ZU07-v9u8YvKVN&jump_from=webapi&authKey=HiFkDO97IWzVgJEO6SWn59U3r7vJPEfvGNq8+Y4RVgOHFRN8+CB9WhpjYJmRvyky"
              target="_blank"
              rel="noopener noreferrer"
              ><n-button quaternary type="info"> 加入QQ群 342289459 </n-button></a
            >
          </div>
        </n-collapse-item>
      </n-collapse>
    </div>
  </div>
</template>

<script lang="ts">
import { NButton, NCollapse, NCollapseItem } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    NCollapse,
    NCollapseItem,
    NButton,
  },
  setup() {
    return {}
  },
})
</script>

<style scoped>
.grid-container {
  max-width: 1280px;
  width: 1280px;
  margin: 0 auto;
  overflow-x: hidden; /* 防止横向滚动条 */
  position: relative;
  z-index: 10;
}
.grid-containerSearch {
  width: 1280px;
  margin: 0 auto;
  overflow-x: hidden; /* 防止横向滚动条 */
}
.home-grass {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0.4), #f5f5f5);
}
</style>
