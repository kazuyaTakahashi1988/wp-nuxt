<template>
  <div class="container">
    
  <div class="page-post inner1040">
		<h2 class="ttl ttl02"><span>お問い合わせ</span></h2>
    
      <form @submit.prevent="exec">
        <table>
            <tr>
              <td>お名前</td>
              <td>
                <input type="text" v-model="formData.yourname" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false">
              </td>
            </tr>
            <tr>
              <td>メールアドレス</td>
              <td><input type="email" v-model="formData.youremail" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email" aria-required="true" aria-invalid="false"></td>
            </tr>
            <tr>
              <td>題名</td>
              <td><input type="text" v-model="formData.yoursubject" value="" size="40" class="wpcf7-form-control wpcf7-text" aria-invalid="false"></td>
            </tr>
            <tr>
              <td>内容</td>
              <td><textarea v-model="formData.yourmessage" cols="40" rows="10" class="wpcf7-form-control wpcf7-textarea" aria-invalid="false"></textarea></td>
            </tr>
        </table>
        <input type="submit" value="送信">
      </form>

<!--       <form action="http://wp.empty-service.com/wp/wp-json/contact-form-7/v1/contact-forms/64/feedback/" method="POST">
        <table>
            <tr>
              <td>お名前</td>
              <td>
                <input type="text" name="your-name" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false">
              </td>
            </tr>
            <tr>
              <td>メールアドレス</td>
              <td><input type="email" name="your-email" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email" aria-required="true" aria-invalid="false"></td>
            </tr>
            <tr>
              <td>題名</td>
              <td><input type="text" name="your-subject" value="" size="40" class="wpcf7-form-control wpcf7-text" aria-invalid="false"></td>
            </tr>
            <tr>
              <td>内容</td>
              <td><textarea name="your-message" cols="40" rows="10" class="wpcf7-form-control wpcf7-textarea" aria-invalid="false"></textarea></td>
            </tr>
        </table>
        <input type="submit" value="送信">
      </form> -->
  </div>


  </div>
  
</template>

<script>

import Header from '~/mixins/header'

export default {
  components: {　},
  mixins: [Header],
  async asyncData(){
    return { // meta & OGP
      meta: {
        title: 'お問い合わせ',
        description: 'お問い合わせのディスクリプション',
        type: 'website',
        image: 'http://35.76.243.135/ogp.jpg',
        url: 'http://35.76.243.135/contact/'
      }
    }
  },
  data() {
    return {
      formData: {
        yourname: '',
        youremail: '',
        yoursubject: '',
        yourmessage: ''
      }
    }
  },
  // transition: 'bounce',
  methods: {
    exec: function () {
      console.log(this.formData.yourname)
      const params = new URLSearchParams();
      //mailareaという箱の中にdata、mailareに入力された内容を入れます。
      params.append('yourname', this.formData.yourname);
      params.append('youremail', this.formData.youremail);
      params.append('yoursubject', this.formData.yoursubject);
      params.append('yourmessage', this.formData.yourmessage);

      this.$axios
        .post('http://wp.empty-service.com/wp/wp-json/contact-form-7/v1/contact-forms/64/feedback/', params)
        .then(response => {
          console.log(response.data.invalidFields[0].into)
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
  
  // 認証用PASS
  // YKOe 1cg8 Ng81 hl1d 3N8R zCGg

}
</script>

