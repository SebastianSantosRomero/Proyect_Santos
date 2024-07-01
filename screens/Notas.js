import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native';

import appFirebase from '../credenciales';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { ListItem, Avatar } from '@rneui/themed';

const db = getFirestore(appFirebase);

export default function Notas(props) {
    const [lista, setLista] = useState([]);

    useEffect(() => {
        const getLista = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'notas'));
                const docs = [];
                querySnapshot.forEach((doc) => {
                    const { titulo, detalle, fecha, hora, image } = doc.data();
                    docs.push({
                        id: doc.id,
                        titulo,
                        detalle,
                        fecha,
                        hora,
                        image
                    });
                });
                setLista(docs);
            } catch (error) {
                console.log(error);
            }
        };
        getLista();
    }, []);

    return (
        <ScrollView>
            <View>
                <TouchableOpacity style={styles.boton} onPress={() => props.navigation.navigate('Crear')}>
                    <Text style={styles.textoBoton}>Agregar una nueva nota</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contenedor}>
                {lista.map((not) => (
                    <ListItem bottomDivider key={not.id} onPress={() => { props.navigation.navigate('Detail', { notaId: not.id }) }}>
                        <ListItem.Content>
                            <ListItem.Title style={styles.titulo}>{not.titulo}</ListItem.Title>
                            <ListItem.Subtitle>{not.fecha}</ListItem.Subtitle>
                            {not.image && <Image source={{ uri: not.image }} style={styles.thumbnail} />}
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    boton: {
        backgroundColor: '#3D85C6',
        borderColor: '#0C4577',
        borderWidth: 3,
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    },
    textoBoton: {
        textAlign: 'center',
        padding: 10,
        color: 'white',
        fontSize: 16
    },
    contenedor: {
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
    titulo: {
        fontWeight: 'bold'
    },
    thumbnail: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginTop: 10
    }
});
