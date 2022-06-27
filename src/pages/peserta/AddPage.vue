<template>
  <q-page>
    <div class="row">
      <div class="col-6 q-my-xl" style="margin-left: auto; margin-right: auto;">
        <q-card style="width: 100%;">
          <q-toolbar>
            <q-toolbar-title>
              Tambah Peserta
            </q-toolbar-title>
          </q-toolbar>
          <q-separator/>
          <q-card-section>
            <q-form @submit="onSubmit">
              <q-input
                v-model="payload.nama"
                label="nama"
                required
                class="q-mb-md"
              />
              <q-input
                v-model="payload.email"
                type="email"
                label="email"
                required
                class="q-mb-md"
              />
              <q-input
                v-model="payload.no_hp"
                label="Nomor Handphone"
                required
                class="q-mb-md"
              />
              <q-select
                v-model="payload.jenis_kelamin"
                label="jenis kelamin"
                required
                class="q-mb-md"
                :options="[
                  'Laki-Laki',
                  'Perempuan'
                ]"
              />
              <q-input 
                v-model="payload.tanggal_lahir" mask="date" :rules="['date']"
                class="q-mb-md"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="payload.tanggal_lahir">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input
                v-model="payload.tempat_lahir"
                label="Tempat Lahir"
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
    nama: '',
    email: '',
    no_hp: '',
    tanggal_lahir: null,
    tempat_lahir: '',
    jenis_kelamin: null
  })
  const router = useRouter()

  async function onSubmit() {
    const _payload = {
      ...payload,
      tanggal_lahir: new Date(payload.tanggal_lahir)
    }
    loading.value = true;
    try {
      const response = await api.post('/api/peserta', _payload)
      router.back()
    } catch (err) {
      console.log(err);
      alert('gagal menambah peserta');
    } finally {
      loading.value = false;
    }
  }
</script>