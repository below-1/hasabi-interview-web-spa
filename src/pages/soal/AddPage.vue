<template>
  <q-page>
    <div class="row">
      <div class="col-6 q-my-xl" style="margin-left: auto; margin-right: auto;">
        <q-card style="width: 100%;">
          <q-toolbar>
            <q-toolbar-title>
              Tambah Soal
            </q-toolbar-title>
          </q-toolbar>
          <q-separator/>
          <q-card-section>
            <q-form @submit="onSubmit">
              <q-input
                v-model="payload.pertanyaan"
                label="pertanyaan"
                required
                class="q-mb-md"
              />
              <q-input
                v-model="payload.kode"
                label="kode"
                required
                class="q-mb-md"
              />
              <div style="display: flex; align-items:center;" class="q-py-sm">
                <label>Status:</label>
                <q-toggle v-model="payload.aktif"></q-toggle>
              </div>
              <q-input
                v-model.number="payload.point"
                type="number"
                min=1
                label="pertanyaan"
                required
                class="q-mb-md"
              />
              <q-btn
                type="submit"
                unelevated
                color="blue"
                label="simpan"
                :loading="loading"
              />
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import { reactive, ref } from 'vue';
  import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';

  const loading = ref(false);
  const payload = reactive({
    pertanyaan: '',
    kode: '',
    aktif: true,
    point: 0,
  })
  const router = useRouter()

  async function onSubmit() {
    const _payload = {
      ...payload
    }
    loading.value = true;
    try {
      const response = await api.post('/api/soal', _payload)
      router.back()
    } catch (err) {
      console.log(err);
      alert('gagal menambah soal');
    } finally {
      loading.value = false;
    }
  }
</script>