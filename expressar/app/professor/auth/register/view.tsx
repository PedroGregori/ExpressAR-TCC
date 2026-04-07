import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

import useRegisterModel from './model'

export default function RegisterView({
  nome,
  email,
  escola,
  senha,
  confirmarSenha,
  loading,
  erro,
  handleNome,
  handleEmail,
  handleEscola,
  handleSenha,
  handleConfirmarSenha,
  handleCadastro,
  handleGoogleLogin,
}: ReturnType<typeof useRegisterModel>) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4B544" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={{ fontSize: 32 }}>👨</Text>
        </View>
        <Text style={styles.title}>Cadastro</Text>
      </View>

      {/* FORM */}
      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          value={nome}
          onChangeText={handleNome}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@email.com"
          value={email}
          onChangeText={handleEmail}
        />

        <Text style={styles.label}>Escola</Text>
        <TextInput
          style={styles.input}
          placeholder="Escola Municipal Da Cidade"
          value={escola}
          onChangeText={handleEscola}
        />

        <Text style={styles.label}>Crie sua senha</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          secureTextEntry
          value={senha}
          onChangeText={handleSenha}
        />

        <Text style={styles.label}>Confirme a senha</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={handleConfirmarSenha}
        />

        {erro ? <Text style={styles.error}>{erro}</Text> : null}

        {/* BOTÕES */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.btn}
            onPress={handleCadastro}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>Criar conta</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.orText}>Ou entre com</Text>

          <TouchableOpacity
            style={styles.googleBtn}
            onPress={handleGoogleLogin}
          >
            <Text style={styles.googleText}>Entrar com Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEAE6',
  },

  header: {
    backgroundColor: '#F4B544',
    height: hp('18%'), // 🔥 diminuído
    borderBottomLeftRadius: wp('6%'),
    borderBottomRightRadius: wp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatar: {
    width: wp('16%'),
    height: wp('16%'),
    borderRadius: wp('8%'),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('0.5%'),
  },

  title: {
    fontSize: wp('5.5%'),
    fontWeight: '800',
    color: '#fff',
  },

  form: {
    flex: 1,
    padding: wp('5%'),
    justifyContent: 'space-between', // 🔥 distribui melhor
  },

  label: {
    fontSize: wp('3.8%'),
    color: '#C48A2B',
    marginBottom: hp('0.3%'),
  },

  input: {
    width: '100%',
    height: hp('5.5%'), // 🔥 menor
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    paddingHorizontal: wp('4%'),
    marginBottom: hp('1.2%'), // 🔥 menor
    borderWidth: 1,
    borderColor: '#ddd',
  },

  actions: {
    marginTop: hp('1%'),
  },

  btn: {
    width: '100%',
    height: hp('5.5%'),
    backgroundColor: '#F4B544',
    borderRadius: wp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: '700',
  },

  error: {
    color: 'red',
    marginBottom: hp('0.5%'),
  },

  orText: {
    textAlign: 'center',
    marginVertical: hp('1%'),
    color: '#999',
  },

  googleBtn: {
    width: '100%',
    height: hp('5.5%'),
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },

  googleText: {
    color: '#000',
    fontWeight: '600',
  },
})