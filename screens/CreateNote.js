import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import appFirebase from '../credenciales';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
const db = getFirestore(appFirebase);

export default function CreateNote(props) {
    const initialState = {
        titulo: '',
        detalle: ''
    };

    const [estado, setEstado] = useState(initialState);
    const [image, setImage] = useState(null);

    const handleChangeText = (value, name) => {
        setEstado({ ...estado, [name]: value });
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.uri);
        }
    };

    const saveNote = async () => {
        try {
            if (estado.titulo === '' || estado.detalle === '') {
                Alert.alert('Mensaje importante', 'Debes rellenar el campo requerido');
            } else {
                const currentDate = new Date();
                const fDate =
                    currentDate.getDate() +
                    '/' +
                    (currentDate.getMonth() + 1) +
                    '/' +
                    currentDate.getFullYear();
                const fTime =
                    'Hora: ' + currentDate.getHours() + ' minutos: ' + currentDate.getMinutes();

                const nota = {
                    titulo: estado.titulo,
                    detalle: estado.detalle,
                    fecha: fDate,
                    hora: fTime,
                    image: image || null,
                };

                await addDoc(collection(db, 'notas'), {
                    ...nota
                });

                Alert.alert('Éxito', 'Guardado con éxito');
                props.navigation.navigate('Notas');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.contenedorPadre}>
            <View style={styles.tarjeta}>
                <View style={styles.contenedor}>
                    <TextInput
                        placeholder="Ingresa el título"
                        style={styles.textoInput}
                        value={estado.titulo}
                        onChangeText={(value) => handleChangeText(value, 'titulo')}
                    />
                    <TextInput
                        placeholder="Ingresa el detalle"
                        multiline={true}
                        numberOfLines={4}
                        style={styles.textoInput}
                        value={estado.detalle}
                        onChangeText={(value) => handleChangeText(value, 'detalle')}
                    />

                    <TouchableOpacity style={styles.botonImagen} onPress={pickImage}>
                        <Text style={styles.textoBtnImagen}>Subir Imagen</Text>
                    </TouchableOpacity>

                    {image && <Image source={{ uri: image }} style={styles.image} />}

                    <View>
                        <TouchableOpacity style={styles.botonEnviar} onPress={saveNote}>
                            <Text style={styles.textoBtnEnviar}>Guardar una nueva nota</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    tarjeta: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    contenedor: {
        padding: 20
    },
    textoInput: {
        borderColor: 'slategray',
        borderWidth: 1,
        padding: 2,
        marginTop: 10,
        borderRadius: 8
    },
    botonImagen: {
        backgroundColor: '#3D85C6',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
    },
    textoBtnImagen: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
        borderRadius: 5,
    },
    botonEnviar: {
        backgroundColor: '#3D85C6',
        borderColor: '#0C4577',
        borderWidth: 3,
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    },
    textoBtnEnviar: {
        textAlign: 'center',
        padding: 10,
        color: 'white',
        fontSize: 16
    }
});
