<template>
  <q-page>
    <q-toolbar>
      <q-toolbar-title>Daftar Peserta</q-toolbar-title>
      <q-btn to="/peserta/add" unelevated color="blue">
        tambah peserta
      </q-btn>
    </q-toolbar>
    <q-separator/>
    <div class="q-py-md">
      <q-table :columns="columns" :rows="items" flat>
        <template v-slot:body-cell-ttl="props">
          <q-td :props="props">
            {{ props.row.tempat_lahir }}, {{ new Date(props.row.tanggal_lahir).toLocaleDateString() }}
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
    name: 'nama',
    field: 'nama',
    align: 'left',
    label: 'Nama',
  },
  {
    name: 'jenis_kelamin',
    field: 'jenis_kelamin',
    align: 'left',
    label: 'Jenis Kelamin',
  },
  {
    name: 'ttl',
    label: 'Tempat Tanggal Lahir',
    field: 'id',
    align: 'left'
  },
  {
    name: 'age',
    label: 'Usia',
    field: 'age',
    align: 'left'
  }
]

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

async function loadPeserta() {
  loading.value = true;
  try {
    const response = await api({
      url: '/api/peserta'
    })
    items.value = response.data.map(it => ({
      ...it,
      age: getAge(it.tanggal_lahir)
    }));
  } catch (err) {
    console.log(err);
    alert('gagal mengambil data');
  } finally {
    loading.value = false;
  }
}

onMounted(loadPeserta);
</script>