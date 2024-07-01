import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert, Image } from 'react-native';

import appFirebase from '../credenciales';
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
const db = getFirestore(appFirebase);

export default function DetailsNote(props) {
    const [nota, setNota] = useState({});

    const getOneNote = async (id) => {
        try {
            const docRef = doc(db, 'notas', id);
            const docSnap = await getDoc(docRef);
            setNota(docSnap.data());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOneNote(props.route.params.notaId);
    }, []);

    const deleteNote = async (id) => {
        await deleteDoc(doc(db, 'notas', id));
        Alert.alert('Éxito', 'Nota eliminada con éxito');
        props.navigation.navigate('Notas');
    };

    return (
        <View style={styles.contenedorPadre}>
            <View style={styles.contenedor}>
                <Text style={styles.texto}>Título: {nota.titulo}</Text>
                <Text style={styles.texto}>Detalle: {nota.detalle}</Text>
                <Text style={styles.texto}>Fecha: {nota.fecha}</Text>
                <Text style={styles.texto}>{nota.hora}</Text>
                {nota.image && <Image source={{ uri: nota.image }} style={styles.image} />}

                <TouchableOpacity style={styles.botonEliminar} onPress={() => deleteNote(props.route.params.notaId)}>
                    <Text style={styles.textoEliminar}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedorPadre: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contenedor: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    texto: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10
    },
    botonEliminar: {
        backgroundColor: '#3D85C6',
        borderColor: '#0C4577',
        borderWidth: 3,
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    },
    textoEliminar: {
        textAlign: 'center',
        padding: 10,
        color: 'white',
        fontSize: 16
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10,
        borderRadius: 5,
        resizeMode: 'contain'  // Esto asegurará que la imagen se ajuste sin distorsionarse
    }
});
