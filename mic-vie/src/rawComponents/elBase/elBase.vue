  <template lc_id="Oi4DTwF59k">
      <div class="vcc-column-ul" lc_id="v/eNukGPZ1">
          <div class="column-li" lc-mark lc_id="qRlb4bI0G0">
              <img class="li-img" src="../../assets/img/btn.png" alt lc_id="xCoGiMuhWy"/>              <div class="title" lc_id="axbG7IIvPa">按钮组件</div>
              <div class="li-mark-content" lc_id="sMU4YKWZEj">
                  <el-button lc_id="CrnHX7KehX">默认按钮</el-button>
              </div>
          </div>
          <div class="column-li" lc-mark lc_id="ceTmJgodvB">
              <img class="li-img max-img" src="../../assets/img/elIcon.png" alt lc_id="6wNsG0TpQn"/>              <div class="title" lc_id="x3l8b0stRE">饿了么图标</div>
              <div class="li-mark-content" lc_id="qpwERkcUfM">
                  <el-icon lc_id="/rOQj4hsN+">
                      <component :is="icon" lc_id="Wsst/HbTvP"></component>
                  </el-icon>
              </div>
          </div>
          <div class="column-li" lc-mark lc_id="bCl0rpo7Ce">
              <img class="li-img" src="../../assets/img/layout.png" alt lc_id="g+kqyE/Sg7"/>              <div class="title" lc_id="jw/nOMPTAN">布局(row)</div>
              <div class="li-mark-content" lc_id="k9gbDxw8Va">
                  <el-row div-lc-mark lc_id="yy5kZtxEXx"></el-row>
              </div>
          </div>
          <div class="column-li" lc-mark lc_id="VgU2BzsfDd">
              <img class="li-img" src="../../assets/img/layout.png" alt lc_id="4F1ibZ+Igi"/>              <div class="title" lc_id="q2GofLY3m9">布局(col)</div>
              <div class="li-mark-content" lc_id="aDksuuCkGg">
                  <el-col div-lc-mark :span="24" lc_id="3k1djWEl0I"></el-col>
              </div>
          </div>
          <div class="column-li" lc-mark lc_id="gcf2QPKQSk">
              <img class="li-img" src="../../assets/img/a.png" alt lc_id="hrEJjww40h"/>              <div class="title" lc_id="2wVqt4J1JJ">link链接</div>
              <div class="li-mark-content" lc_id="39w2Sh2DTl">
                  <el-link type="primary" lc_id="qKFaX6dyG1">primary</el-link>
              </div>
          </div>
          <div class="column-li" lc-mark lc_id="akIusgI46B">
              <img class="li-img max-img" src="../../assets/img/text.png" alt lc_id="9nJgcPmA9+"/>              <div class="title" lc_id="Sd+k0xS1ZG">Text 文本</div>
              <div class="li-mark-content" lc_id="5EjnkkxEy/">
                  <el-text lc_id="gRjgAeZl4r">Default</el-text>
              </div>
          </div>
      </div>
  </template>
  <script>
export default {
  data() {
    return {
      icon: "ElemeFilled",
    };
  },
  methods: {},
};  </script>
  <style scoped></style>
