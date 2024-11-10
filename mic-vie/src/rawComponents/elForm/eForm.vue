  <template lc_id="bYQ+0tm1nf">
      <div class="vcc-column-ul" lc_id="zrWMi8mWeP">
          <div class="column-li" lc-mark lc_id="Y78iSN0Sp1">
              <img class="li-img max-img" src="../../assets/img/form.png" alt lc_id="u0vgq3r//a"/>              <div class="title" lc_id="ikG+kH1R0P">form</div>
              <div class="li-mark-content" lc_id="7cfYpprPz9">
                  <el-form div-lc-mark ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" lc_id="wKxLhLjsca"></el-form>
              </div>
          </div>
          <div class="column-li" lc-mark lc_id="YBrbHc6X6o">
              <img class="li-img max-img" src="../../assets/img/form-item.png" alt lc_id="BMqFo9HW1y"/>              <div class="title" lc_id="j1izwqSpwr">form-item</div>
              <div class="li-mark-content" lc_id="vcpZtpcClj">
                  <el-form-item div-lc-mark label prop lc_id="W7m0/Uyfaq"></el-form-item>
              </div>
          </div>
          <div class="column-li" lc-mark lc_id="iKovuIOhMZ">
              <img class="li-img max-img" src="../../assets/img/input.png" alt lc_id="Mxv0PI2r+l"/>              <div class="title" lc_id="DaLxfR+8YH">输入框</div>
              <div class="li-mark-content" lc_id="9EOPu1u7j9">
                  <el-input placeholder lc_id="w5ZRAAz2un"></el-input>
              </div>
          </div>
          <div class="column-li" lc-mark lc_id="dpnLQaulzS">
              <img class="li-img max-img" src="../../assets/img/numberInput.png" alt lc_id="Zejq7ayZFK"/>              <div class="title" lc_id="OrFZDNbV71">数字输入框</div>
              <div class="li-mark-content" lc_id="D7pIp3yAeb">
                  <el-input-number :min="1" :max="10" lc_id="svh1/EY0Ot"></el-input-number>
              </div>
          </div>
          <div class="column-li" lc-mark lc_id="mhT22wNbJA">
              <img class="li-img max-img" src="../../assets/img/radio.png" alt lc_id="HKyboqIxpL"/>              <div class="title" lc_id="WzMVYq3T0z">单选按钮</div>
              <div class="li-mark-content" lc_id="WTC7bytlJb">
                  <el-radio-group lc_id="ehPox1Ol6x">
                      <el-radio v-for="(item, index) in radioOptions" :key="index" :label="item.value" lc_id="BWnz/2ULa2">{{ item.label }}</el-radio>
                  </el-radio-group>
              </div>
          </div>
          <div class="column-li" lc-mark lc_id="mVI5aR08wR">
              <img class="li-img max-img" src="../../assets/img/select.png" alt lc_id="Y5IttRRuV3"/>              <div class="title" lc_id="cnGRGKosUo">选择器</div>
              <div class="li-mark-content" lc_id="jB4JEDOVLI">
                  <el-select lc_id="JgVLr8bAaZ">
                      <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value" lc_id="mKLjEMVhtX"></el-option>
                  </el-select>
              </div>
          </div>
          <div class="column-li" lc-mark lc_id="v5XmawJp+L">
              <img class="li-img" src="../../assets/img/autocomplete.png" alt lc_id="133AjpmvAF"/>              <div class="title" lc_id="EfnunFlMkC">auto自动补全</div>
              <div class="li-mark-content" lc_id="e2L2h946q/">
                  <el-autocomplete :fetch-suggestions="querySearch" clearable placeholder @select="handleSelect" lc_id="GKaRcZ+ila"></el-autocomplete>
              </div>
          </div>
          <div class="column-li" lc-mark lc_id="ptQK0/tHMO">
              <img class="li-img max-img" src="../../assets/img/ljxzq.png" alt lc_id="YInGNH2yxS"/>              <div class="title" lc_id="5V/b+hefEG">联级选择器</div>
              <div class="li-mark-content" lc_id="92aFXzKwX6">
                  <el-cascader :options="cascaderOptions" @change="handleChange" lc_id="5kWVw5fo6+"></el-cascader>
              </div>
          </div>
          <div class="column-li" lc-mark lc_id="9Nx8ZtPWXm">
              <img class="li-img max-img" src="../../assets/img/checkbox.png" alt lc_id="4P5kKoqZ9u"/>              <div class="title" lc_id="3gwZVCrSqk">多选框</div>
              <div class="li-mark-content" lc_id="n1Xe/7eVnK">
                  <el-checkbox-group lc_id="ddGA/m293B">
                      <el-checkbox v-for="(item, index) in checkboxOptions" :key="index" :label="item.label" :value="item.value" lc_id="LieBz/TE+m"></el-checkbox>
                  </el-checkbox-group>
              </div>
          </div>
          <div class="column-li" lc-mark lc_id="KrizrDE1+O">
              <img class="li-img" src="../../assets/img/datatime.png" alt lc_id="bXexoHIJOZ"/>              <div class="title" lc_id="iqma6B15w8">日期组件</div>
              <div class="li-mark-content" lc_id="d5m34DUFix">
                  <el-date-picker type="datetime" placeholder lc_id="DcIH6OR45G"></el-date-picker>
              </div>
          </div>
          <div class="column-li" lc-mark lc_id="1vS704pwER">
              <img class="li-img max-img" src="../../assets/img/tree.png" alt lc_id="YN93sFpD+C"/>              <div class="title" lc_id="L1y+LEE1TC">树形控件</div>
              <div class="li-mark-content" lc_id="TK2vU7cMyx">
                  <el-tree :data="treeData" show-checkbox node-key="id" :props="defaultProps" lc_id="0Gq8PHD1Fc"></el-tree>
              </div>
          </div>
      </div>
  </template>
  <script>
export default {
  data() {
    return {
      ruleForm: {},
      rules: {},
      treeData: [
        {
          id: 1,
          label: "Level one 1",
          children: [
            {
              id: 4,
              label: "Level two 1-1",
              children: [
                {
                  id: 9,
                  label: "Level three 1-1-1",
                },
                {
                  id: 10,
                  label: "Level three 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "Level one 2",
          children: [
            {
              id: 5,
              label: "Level two 2-1",
            },
            {
              id: 6,
              label: "Level two 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "Level one 3",
          children: [
            {
              id: 7,
              label: "Level two 3-1",
            },
            {
              id: 8,
              label: "Level two 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
        disabled: "disabled",
      },
      selectOptions: [],
      radioOptions: [
        {
          label: "Option A",
          value: 3,
        },
        {
          label: "Option B",
          value: 4,
        },
      ],
      checkboxOptions: [
        {
          label: "Option A",
          value: "Value A",
        },
        {
          label: "Option B",
          value: "Value B",
        },
      ],
      cascaderOptions: [],
    };
  },
  methods: {
    querySearch(queryString, cb) {
      const restaurants = [
        { value: "vue", link: "https://github.com/vuejs/vue" },
        { value: "element", link: "https://github.com/ElemeFE/element" },
        { value: "cooking", link: "https://github.com/ElemeFE/cooking" },
        { value: "mint-ui", link: "https://github.com/ElemeFE/mint-ui" },
        { value: "vuex", link: "https://github.com/vuejs/vuex" },
        { value: "vue-router", link: "https://github.com/vuejs/vue-router" },
        { value: "babel", link: "https://github.com/babel/babel" },
      ];
      const createFilter = (queryString) => {
        return (restaurant) => {
          return (
            restaurant.toLowerCase().indexOf(queryString.toLowerCase()) === 0
          );
        };
      };
      const results = queryString
        ? restaurants.filter(createFilter(queryString))
        : restaurants;
      // call callback function to return suggestions
      cb(results);
    },
    handleSelect(item) {
      console.log(item);
    },
    handleChange(value) {},
  },
};  </script>
