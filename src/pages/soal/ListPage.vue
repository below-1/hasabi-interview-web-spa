<template>
  <q-page>
    <q-toolbar>
      <q-toolbar-title>Daftar Soal</q-toolbar-title>
      <q-btn to="/soal/add" unelevated color="blue">
        tambah soal
      </q-btn>
    </q-toolbar>
    <q-separator/>
    <div class="q-py-md">
      <q-table :columns="columns" :rows="items" flat>
        <template v-slot:body-cell-aktif="props">
          <q-td :props="props">
            {{ props.row.aktif ? 'Aktif'  : 'Tidak Aktif' }}
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { api } from 'src/boot/axios';

const loading = ref(false);
const items = ref([]);

const columns = [
  {
    name: 'no',
    field: 'id',
    align: 'left'
  },
  {
    name: 'kode',
    field: 'kode',
    align: 'left',
    label: 'Kode',
  },
  {
    name: 'pertanyaan',
    field: 'pertanyaan',
    align: 'left',
    label: 'Pertanyaan',
  },
  {
    name: 'aktif',
    field: 'aktif',
    align: 'left',
    label: 'Status',
  },
]

async function loadSoal() {
  loading.value = true;
  try {
    const response = await api({
      url: '/api/soal'
    })
    items.value = response.data.map(it => ({
      ...it
    }));
  } catch (err) {
    console.log(err);
    alert('gagal mengambil data');
  } finally {
    loading.value = false;
  }
}

onMounted(loadSoal);
</script>