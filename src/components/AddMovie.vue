<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>Add New Movie</b-button>
    <b-modal
      id="modal-prevent-closing"
      title="Submit Your Movie"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form @submit.stop.prevent="handleSubmit">

        <b-form-group
          label="Title"
          label-for="title-input"
        >
          <b-form-input
            id="name-input"
            v-model="title"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Rate"
          label-for="rate-input"
        >
          <b-form-input
            type="number"
            min="1"
            max="5"
            id="rate-input"
            v-model="rate"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Date"
          label-for="date-input"
        >
          <b-form-input
            type="date"
            id="date-input"
            v-model="date"

            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Image"
          label-for="image-input"
        >
          <b-form-input
            id="image-input"
            v-model="image"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Description"
          label-for="description-input"
        >
          <b-form-input
            id="description-input"
            v-model="description"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Category"
          label-for="category-input"
        >
          <b-form-input
            id="Category-input"
            v-model="category"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AddMovie',
  data () {
    return {
      title: '',
      rate: '',
      date: '',
      image: '',
      description: '',
      category: ''
    }
  },
  computed: {
    ...mapState(['movies'])
  },
  methods: {
    ...mapActions(['addMovie']),
    resetModal () {
      this.title = ''
      this.rate = ''
      this.date = ''
      this.image = ''
      this.description = ''
      this.category = ''
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      if (this.title && this.rate > 0 && this.rate < 5 && this.date && this.image && this.description && this.category) {
      // Push the new movie to movies
        this.addMovie({
          _id: Math.random(),
          title: this.title,
          rate: this.rate,
          date: this.date,
          imgUrl: this.image,
          description: this.description,
          category: this.category
        })
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      } else {
        alert('Please fill all the fields with valid values')
      }
    }
  }
}
</script>
