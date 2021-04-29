<!--xiolng-->
<!--SystemIdeaDetail-->
<!--2021/4/19-->
<!--10:19-->
<template>
  <div class="system-idea-detail main-content">
    <div class="item-box">
      <div class="item-label">
        创建时间：
      </div>
      <div class="item-content">
        {{detail.createTime}}
      </div>
    </div>
    <div class="item-box">
      <div class="item-label">
        标题：
      </div>
      <div class="item-content">
        {{detail.ideaTitle}}
      </div>
    </div>
    <div class="item-box">
      <div class="item-label">
        移动电话：
      </div>
      <div class="item-content">
        {{detail.ideaTel}}
      </div>
    </div>
    <div class="item-box">
      <div class="item-label">
        用户名：
      </div>
      <div class="item-content">
        {{detail.ideaBy}}
      </div>
    </div>
    <div class="item-box">
      <div class="item-label">
        反馈图片：
      </div>
      <div class="item-content">
        <a-avatar
          v-for="(item,index) in detail.ideaImageList"
          :key="index"
          shape="square"
          :src="`/files/${item}`"
          alt="问题图片"
          class="imgs"
          @click="showImg = `/files/${item}`"
        />
      </div>
    </div>
    <div class="item-box">
      <div class="item-label">
        反馈详情：
      </div>
      <div class="item-content">
        {{detail.ideaContent}}
      </div>
    </div>

    <!--<div class="btn-box">-->
    <!--  <a-button-->
    <!--    v-if="detail.auditStatus !== '2'"-->
    <!--    :disabled="detail.auditStatus !== '1'"-->
    <!--    type="danger"-->
    <!--    @click="setStatus(detail.id, 3)"-->
    <!--  >审核失败-->
    <!--  </a-button>-->
    <!--  <a-button-->
    <!--    v-if="detail.auditStatus !== '3'"-->
    <!--    :disabled="detail.auditStatus !== '1'"-->
    <!--    type="primary"-->
    <!--    @click="setStatus(detail.id, 2)"-->
    <!--  >审核成功-->
    <!--  </a-button>-->
    <!--</div>-->
    <a-modal
      :visible="!!showImg"
      :footer="null"
      @cancel="showImg = null"
      title="查看图片"
    >
      <div style="text-align: center;">
        <img v-if="showImg" :src="showImg" alt="反馈图片" class="imgs" style="width: 100%;" />
      </div>
    </a-modal>
  </div>
</template>

<script>
  import { getSystemIdeaByIdApi } from '@/api/SystemIdeaApi'

  export default {
    name: 'SystemIdeaDetail',
    data () {
      return {
        detail: {},
        showImg: ''
      }
    },
    mounted () {
      this.getDetail()
    },
    methods: {
      getDetail () {
        getSystemIdeaByIdApi({
          systemIdeaId: this.$route.query.id
        }).then(res => {
          if (res.data.code === '200') {
            this.detail = res.data.data
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .system-idea-detail {
    .item-box {
      display: flex;
      align-items: flex-start;

      .item-label {
        width: 100px;
        flex-shrink: 0;
        margin-bottom: 10px;
      }

      .item-content {
        margin-bottom: 10px;

        .imgs {
          width: 100px;
          height: 100px;
        }
      }
    }

    .btn-box {
      padding: 40px 20px;
      background: #fafafa;
      display: flex;
      width: 50%;
      justify-content: space-around;
    }
  }
</style>
